import {
  SmartHomeV1SyncResponse,
  SmartHomeV1QueryResponse,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1SyncDevices,
  smarthome,
  SmartHomeV1DisconnectResponse,
} from 'actions-on-google';
import {Router} from 'express';

import {createGCF} from '../func/utils.js';
import {DeviceService} from '../devices/device.service.js';
import {FishDevice} from '../devices/fish-device.js';
import {ApiClientObjectMap} from 'actions-on-google/dist/common.js';

const deviceService = new DeviceService();
const router = Router();

const smarthomeHandler = smarthome({});

smarthomeHandler.onSync(async body => {
  const devices = await deviceService.getList();
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
});

smarthomeHandler.onQuery(async body => {
  const {devices: queryDevices} = body.inputs[0].payload;
  const devicesPromises = queryDevices.map(async x => {
    return await deviceService.getById(x.id);
  });
  const devicesRes = await Promise.all(devicesPromises);

  // FIXME: Handle errors properly
  const devices = <FishDevice[]>devicesRes.filter(x => x);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const stateMap: ApiClientObjectMap<any> = devices
    .filter(x => x)
    .reduce((obj, x) => {
      obj[x.id] = {...x.state, status: 'SUCCESS'};
      return obj;
    }, {} as ApiClientObjectMap<any>);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const resp = {
    requestId: body.requestId,
    payload: {
      devices: stateMap,
    },
  } as SmartHomeV1QueryResponse;

  return resp;
});

smarthomeHandler.onExecute(async body => {
  const resp = {
    requestId: body.requestId,
    payload: {}, // FIXME: Implement
  } as SmartHomeV1ExecuteResponse;

  return resp;
});

smarthomeHandler.onDisconnect(async () => {
  const resp = {} as SmartHomeV1DisconnectResponse;
  return resp;
});

router.post('/', smarthomeHandler);

export default createGCF('google-smarthome', router);
