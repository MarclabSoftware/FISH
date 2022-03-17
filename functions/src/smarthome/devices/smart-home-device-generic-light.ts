import {SmartHomeDeviceGeneric} from './smart-home-device-generic';

export interface SmartHomeDeviceGenericLight extends SmartHomeDeviceGeneric {
  state: {
    online: boolean;
    on: boolean;
    brightness?: number;
    color?: {};
  };
}
