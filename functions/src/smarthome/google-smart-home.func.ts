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
import {SmartHomeIntentResponses} from './smart-home-intent-responses';

@gcfunc('google-smarthome')
export class GoogleSmartHomeFunc extends BaseHttpController {
  constructor() {
    super();
  }

  responses = new SmartHomeIntentResponses();

  @httpPost('/')
  private index() {
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
        resp = this.onSync(reqBody as SmartHomeV1SyncRequest);
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

  private onSync(body: SmartHomeV1SyncRequest): SmartHomeV1SyncResponse {
    const resp = {
      requestId: body.requestId,
      payload: this.responses.getSyncPayload(),
    } as SmartHomeV1SyncResponse;

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
