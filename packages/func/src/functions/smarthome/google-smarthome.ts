import {
  SmartHomeV1SyncResponse,
  smarthome as gSmarthome,
} from 'actions-on-google';
import {HttpFunction} from '@google-cloud/functions-framework';

const smarthomeApp = gSmarthome();

smarthomeApp.onSync(async (body, headers) => {
  const userId = '1234';

  const syncResponse = {
    requestId: body.requestId,
    payload: {
      agentUserId: userId,
      devices: [],
    },
  } as SmartHomeV1SyncResponse;

  return syncResponse;
});

export const googleSmarthome: HttpFunction = (req, res) => {
  return smarthomeApp(req, res);
};
