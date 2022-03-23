import {injectable} from 'inversify';
import {
  SmartHomeV1QueryRequestPayload,
  SmartHomeV1QueryPayload,
  SmartHomeV1SyncPayload,
  SmartHomeV1SyncDevices,
  SmartHomeV1ExecutePayload,
  SmartHomeV1ExecuteRequestPayload,
  SmartHomeV1ExecuteResponseCommands,
} from 'actions-on-google';
import {ISmartHomeIntentResponses} from './i-smart-home-intent-responses';
import {SmartHomeDeviceGeneric} from './devices/smart-home-device-generic';
import {
  agentUserId,
  dummyDevicesList,
  dummyDevicesMap,
} from './dummy-datastore';
import {SmartHomeDeviceUtils} from './devices/smart-home-device-utils';

@injectable()
export class SmartHomeIntentResponses implements ISmartHomeIntentResponses {
  getSyncPayload(): SmartHomeV1SyncPayload {
    const responseDevices: SmartHomeV1SyncDevices[] = [];
    dummyDevicesList.forEach(device => {
      responseDevices.push({
        id: device.id,
        type: device.type,
        traits: device.traits,
        name: {
          name: device.name.name,
          defaultNames: device.name.defaultNames ?? [],
          nicknames: device.name.nicknames ?? [],
        },
        willReportState: device.willReportState,
        deviceInfo: device.deviceInfo,
      });
    });
    return {agentUserId: agentUserId, devices: responseDevices};
  }

  getQueryPayload(
    request: SmartHomeV1QueryRequestPayload
  ): SmartHomeV1QueryPayload {
    const queryDevices = request.devices;
    const devicesResponse: {[key: string]: any} = {};

    queryDevices.forEach(queryDevice => {
      const queryDeviceId = queryDevice.id;
      devicesResponse[queryDeviceId] = {};

      const localDevice = dummyDevicesList.find(
        dummyDevice => dummyDevice.id === queryDeviceId
      );
      if (localDevice === undefined) {
        devicesResponse[queryDeviceId].online = false;
        devicesResponse[queryDeviceId].status = 'ERROR';
        devicesResponse[queryDeviceId].errorCode = 'DeviceIDnotFound';
      } else {
        devicesResponse[queryDeviceId] = JSON.parse(
          JSON.stringify(localDevice.state)
        ); // TODO: check this
        devicesResponse[queryDeviceId].status = 'SUCCESS';
      }
    });
    return {
      devices: devicesResponse,
    };
  }

  // WIP: this must be reworked
  getExecutePayload(
    request: SmartHomeV1ExecuteRequestPayload
  ): SmartHomeV1ExecutePayload {
    const responsePayload: SmartHomeV1ExecutePayload = {commands: []};

    request.commands.forEach(command => {
      const foundDevicesIds: string[] = [];
      const missingDevicesIds: string[] = [];

      command.devices.forEach(device => {
        const reqId = device.id;
        const localDevice = dummyDevicesList.find(
          dummyDevice => dummyDevice.id === reqId
        );

        // Check if the device exists
        if (localDevice === undefined) {
          missingDevicesIds.push(reqId);
        } else {
          foundDevicesIds.push(reqId);
        }
      });

      // Add missing devices to commands response
      responsePayload.commands.push({
        ids: missingDevicesIds,
        status: 'ERROR',
        errorCode: 'DeviceIDnotFound',
      });

      // Add found devices to commands response
      responsePayload.commands.push({
        ids: [],
        status: 'SUCCESS', // TODO: let's assume that requests for found devices will not give problems for now
      });

      const executions = command.execution;

      foundDevicesIds.forEach(id => {
        executions.forEach(execution => {
          //TODO: must apply new state here by calling smart home device utils, how?
        });
        responsePayload.commands[responsePayload.commands.length - 1].ids.push(
          id
        );
      });
    });
    return responsePayload;
  }
}
