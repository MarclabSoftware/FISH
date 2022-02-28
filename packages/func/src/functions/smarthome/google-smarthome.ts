import {HttpFunction} from '@google-cloud/functions-framework';
import {smarthome as gSmarthome} from 'actions-on-google';

const smarthomeApp = gSmarthome();

smarthomeApp.onSync(async (body, headers) => {
  const userId = '1234';

  const syncResponse = {
    requestId: body.requestId,
    payload: {
      agentUserId: userId,
      devices: [],
    },
  };

  return syncResponse;
});

export const googleSmarthome: HttpFunction = (req, res) => {
  return smarthomeApp(req, res);
};
