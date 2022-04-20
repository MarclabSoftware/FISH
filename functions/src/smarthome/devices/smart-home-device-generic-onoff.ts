import {SmartHomeDeviceGeneric} from './smart-home-device-generic';

export type SmartHomeDeviceGenericOnOff = SmartHomeDeviceGeneric<
  {
    on: boolean;
  },
  {
    commandOnlyOnOff?: boolean;
    queryOnlyOnOff?: boolean;
  }
> & {
  traits: ['action.devices.traits.OnOff'];
};
