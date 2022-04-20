import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';
import {injectable} from 'inversify';
import {SmartHomeDeviceGeneric} from './smart-home-device-generic';
import {SmartHomeDeviceGenericOnOff} from './smart-home-device-generic-onoff';
import {
  dummyDevicesList,
  dummyDevicesMap,
  agentUserId,
} from '../dummy-datastore';
import {SmartHomeDeviceGenericBrightness} from './smart-home-device-generic-brightness';

@injectable()
export class SmartHomeDeviceUtils {
  isOnOffDevice(
    device: Pick<SmartHomeDeviceGeneric, 'traits'>
  ): device is SmartHomeDeviceGenericOnOff {
    return device.traits.includes('action.devices.traits.OnOff');
  }
  isBrightnessDevice(
    device: Pick<SmartHomeDeviceGeneric, 'traits'>
  ): device is SmartHomeDeviceGenericBrightness {
    return device.traits.includes('action.devices.traits.Brightness');
  }

  // For execute response, single state
  getStateByCommand(id: string, command: string): {} {
    switch (command) {
      case 'action.devices.commands.OnOff':
        if (this.isOnOffDevice(dummyDevicesMap[id])) {
          return {
            on: dummyDevicesMap[id].state.on,
          };
        }
        return {};
      case 'action.devices.commands.BrightnessAbsolute':
      case 'action.devices.commands.BrightnessRelative':
        if (this.isBrightnessDevice(dummyDevicesMap[id])) {
          return {
            brightness: dummyDevicesMap[id].state.brightness,
          };
        }
        return {};

      default:
        return {}; //FIXME
    }
  }

  // May be useful in future
  getStateByTrait(id: string, trait: string): {} {
    switch (trait) {
      case 'action.devices.traits.OnOff':
        return {
          on: dummyDevicesMap[id].state.on,
        };
      default:
        return {}; //FIXME
    }
  }

  performExecute(
    id: string,
    execution: SmartHomeV1ExecuteRequestExecution
  ): {} {
    switch (execution.command) {
      case 'action.devices.commands.OnOff':
        dummyDevicesMap[id].state.on =
          execution.params?.on ?? dummyDevicesMap[id].state.on;
        break;

      default:
        break;
    }
    return this.getStateByCommand(id, execution.command);
  }
}
