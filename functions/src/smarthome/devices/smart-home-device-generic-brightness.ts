import {SmartHomeDeviceGeneric} from './smart-home-device-generic';

export type SmartHomeDeviceGenericBrightness = SmartHomeDeviceGeneric<
  {
    brightness: number;
  },
  {
    commandOnlyBrightness?: boolean;
  }
> & {
  traits: ['action.devices.traits.Brightness'];
};
