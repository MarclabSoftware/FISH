import {
  SmartHomeV1SyncResponse,
  SmartHomeV1SyncRequest,
  Headers,
  SmartHomeV1Request,
  SmartHomeV1Response,
  SmartHomeV1QueryRequest,
  SmartHomeV1SyncRequestInputs,
  SmartHomeV1QueryResponse,
  SmartHomeV1ExecuteRequest,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1DisconnectRequest,
  SmartHomeV1DisconnectResponse,
} from 'actions-on-google';
import {gcfunc} from '../func/gcfunc.decorator';
import {BaseHttpController, httpPost} from 'inversify-express-utils';

@gcfunc('google-smarthome')
export class GoogleSmarthomeFunc extends BaseHttpController {
  constructor() {
    super();
  }

  @httpPost('/')
  private index() {
    const reqBody = this.httpContext.request.body as SmartHomeV1Request;

    if (reqBody.inputs.length !== 1) {
      const msg = `Provided ${reqBody.inputs.length} intents in a single request, expected only 1.`;
      console.error(msg);
      return this.badRequest(msg);
    }

    let resp: SmartHomeV1Response;
    const input = reqBody.inputs[0];

    switch (input.intent) {
      case 'action.devices.SYNC':
        resp = this.onSync(reqBody as SmartHomeV1SyncRequest);
        break;
      case 'action.devices.QUERY':
        resp = this.onQuery(reqBody as SmartHomeV1QueryRequest);
        break;
      case 'action.devices.EXECUTE':
        resp = this.onExecute(reqBody as SmartHomeV1ExecuteRequest);
        break;
      case 'action.devices.DISCONNECT':
        resp = this.onDisconnect(reqBody as SmartHomeV1DisconnectRequest);
        break;
      default:
        throw new Error('unsupported intent');
    }

    return this.httpContext.response.json(resp);
  }

  private onSync(body: SmartHomeV1SyncRequest): SmartHomeV1SyncResponse {
    const userId = '1234';

    const resp = {
      requestId: body.requestId,
      payload: {
        agentUserId: userId,
        devices: [],
      },
    } as SmartHomeV1SyncResponse;

    return resp;
  }

  private onQuery(body: SmartHomeV1QueryRequest): SmartHomeV1QueryResponse {
    const userId = '1234';

    const resp = {
      requestId: body.requestId,
      payload: {
        agentUserId: userId,
        devices: [],
      },
    } as SmartHomeV1QueryResponse;

    return resp;
  }

  private onExecute(
    body: SmartHomeV1ExecuteRequest
  ): SmartHomeV1ExecuteResponse {
    const resp = {
      requestId: body.requestId,
      payload: {
        commands: [],
      },
    } as SmartHomeV1ExecuteResponse;

    return resp;
  }

  private onDisconnect(body: SmartHomeV1DisconnectRequest) {
    const userId = '1234';

    const resp = {
      requestId: body.requestId,
      payload: {
        agentUserId: userId,
        devices: [],
      },
    } as SmartHomeV1DisconnectResponse;

    return resp;
  }
}
