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
import {ISmartHomeIntentResponses} from './i-smarthome-intent-responses';
import {SmartHomeDeviceGeneric} from './devices/smart-home-device-generic';
import {agentUserId, dummyDevices} from './devices/dummy-devices';

@injectable()
export class SmartHomeIntentResponses implements ISmartHomeIntentResponses {
  getSyncPayload(): SmartHomeV1SyncPayload {
    const responseDevices: SmartHomeV1SyncDevices[] = [];
    dummyDevices.forEach(device => {
      responseDevices.push({
        id: device.id,
        type: device.type,
        traits: device.finalTraits,
        name: {
          name: device.name,
          defaultNames: device.defaultNames || [],
          nicknames: device.nickNames || [],
        },
        willReportState: device.willReportSTate,
        deviceInfo: {
          manufacturer: device.manufacturer,
          model: device.model,
          hwVersion: device.hwVersion,
          swVersion: device.swVersion,
        },
      });
    });
    return {agentUserId: agentUserId, devices: responseDevices};
  }

  getQueryPayload(
    request: SmartHomeV1QueryRequestPayload
  ): SmartHomeV1QueryPayload {
    const queryDevices = request.devices;
    const devicesResponse: any = {};

    queryDevices.forEach(queryDevice => {
      const queryDeviceId = queryDevice.id;
      devicesResponse[queryDeviceId] = {};
      const localDevice = dummyDevices.find(
        dummyDevice => dummyDevice.id === queryDeviceId
      );
      if (localDevice === undefined) {
        devicesResponse[queryDeviceId].online = false;
        devicesResponse[queryDeviceId].status = 'ERROR';
        devicesResponse[queryDeviceId].errorCode = 'DeviceIDnotFound';
      } else {
        devicesResponse[queryDeviceId] = JSON.parse(
          JSON.stringify(localDevice.state)
        ); // FIXME?
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
      const foundDevices: SmartHomeDeviceGeneric[] = [];
      const missingDevicesIds: string[] = [];

      command.devices.forEach(device => {
        const reqId = device.id;
        const localDevice = dummyDevices.find(
          dummyDevice => dummyDevice.id === reqId
        );

        if (localDevice === undefined) {
          missingDevicesIds.push(reqId);
        } else {
          foundDevices.push(localDevice);
        }
      });
      // Add missing devices to commands response
      responsePayload.commands.push({
        ids: missingDevicesIds,
        status: 'ERROR',
        errorCode: 'DeviceIDnotFound',
      });
      // Let's assume everything goes OK for now
      responsePayload.commands.push({
        ids: [],
        status: 'SUCCESS',
      });

      const executions = command.execution;

      foundDevices.forEach(device => {
        executions.forEach(execution => {
          // FIXME: check this...
          if (device.setState) {
            // Let's assume everything goes OK for now
            /*             
            const newState = device.setState(execution);
            if (Object.keys(newState).length > 0) { // If it's OK
              // FIXME
            } 
            */

            // Don't return back the new state for now
            device.setState(execution);
          }
        });
        responsePayload.commands[responsePayload.commands.length - 1].ids.push(
          device.id
        );
      });
    });
    return responsePayload;
  }
}
