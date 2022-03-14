import {
  SmartHomeV1SyncPayload,
  SmartHomeV1ExecutePayload,
  SmartHomeV1ExecuteRequestPayload,
  SmartHomeV1QueryPayload,
  SmartHomeV1QueryRequestPayload,
} from 'actions-on-google';

export interface ISmartHomeIntentResponses {
  getSyncPayload(): SmartHomeV1SyncPayload;
  getQueryPayload(
    request: SmartHomeV1QueryRequestPayload
  ): SmartHomeV1QueryPayload;
  getExecutePayload(
    request: SmartHomeV1ExecuteRequestPayload
  ): SmartHomeV1ExecutePayload;
}
