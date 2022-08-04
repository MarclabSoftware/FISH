import {
  SmartHomeV1SyncResponse,
  SmartHomeV1SyncRequest,
  SmartHomeV1Request,
  SmartHomeV1Response,
  SmartHomeV1QueryRequest,
  SmartHomeV1QueryResponse,
  SmartHomeV1ExecuteRequest,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1SyncDevices,
} from 'actions-on-google';
import {gcfunc} from '../func/gcfunc.decorator';
import {BaseHttpController, httpPost} from 'inversify-express-utils';
import {SmartHomeIntentResponses} from './smart-home-intent-responses';
import {inject} from 'inversify';
import {DI_TYPES} from '../di/types';
import {IDeviceService} from '../devices/i-device.service';

@gcfunc('google-smarthome')
export class GoogleSmarthomeFunc extends BaseHttpController {
  constructor(
    @inject(DI_TYPES.DeviceService) private deviceService: IDeviceService
  ) {
    super();
  }

  responses = new SmartHomeIntentResponses();

  @httpPost('/')
  private async index() {
    const reqBody = this.httpContext.request.body as SmartHomeV1Request;

    if (reqBody.inputs.length !== 1) {
      const msg = `Provided ${reqBody.inputs.length} intents in a single request, expected only 1.`;
      console.error(msg);
      return this.badRequest(msg);
    }

    let resp: SmartHomeV1Response = {};
    const input = reqBody.inputs[0];

    switch (input.intent) {
      case 'action.devices.SYNC':
        resp = await this.onSync(reqBody as SmartHomeV1SyncRequest);
        break;
      case 'action.devices.QUERY':
        resp = this.onQuery(reqBody as SmartHomeV1QueryRequest);
        break;
      case 'action.devices.EXECUTE':
        resp = this.onExecute(reqBody as SmartHomeV1ExecuteRequest);
        break;
      case 'action.devices.DISCONNECT':
        this.onDisconnect();
        // This doesn't need response
        break;
      default:
        throw new Error('unsupported intent');
    }
    if (Object.keys(resp).length === 0) {
      return;
    }
    return this.httpContext.response.json(resp);
  }

  private async onSync(
    body: SmartHomeV1SyncRequest
  ): Promise<SmartHomeV1SyncResponse> {
    const devices = await this.deviceService.getUserDevices('');
    const smartHomeDevices = devices.map(x => {
      const y = x.definition as SmartHomeV1SyncDevices;
      y.id = x.id;
      y.attributes = x.attributes;
      return y;
    });

    const resp = <SmartHomeV1SyncResponse>{
      requestId: body.requestId,
      payload: {
        agentUserId: 'FIXME_AGENT_USER_ID', // FIXME: Use proper agent user id
        devices: smartHomeDevices,
      },
    };

    return resp;
  }

  private onQuery(body: SmartHomeV1QueryRequest): SmartHomeV1QueryResponse {
    const resp = {
      requestId: body.requestId,
      payload: this.responses.getQueryPayload(body.inputs[0].payload),
    } as SmartHomeV1QueryResponse;

    return resp;
  }

  private onExecute(
    body: SmartHomeV1ExecuteRequest
  ): SmartHomeV1ExecuteResponse {
    const resp = {
      requestId: body.requestId,
      payload: this.responses.getExecutePayload(body.inputs[0].payload),
    } as SmartHomeV1ExecuteResponse;

    return resp;
  }

  private onDisconnect() {}
}
