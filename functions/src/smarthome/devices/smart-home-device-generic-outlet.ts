import {SmartHomeDeviceGeneric} from './smart-home-device-generic';

export interface SmartHomeDeviceGenericOutlet extends SmartHomeDeviceGeneric {
  state: {
    online: boolean;
    on: boolean;
  };
}
