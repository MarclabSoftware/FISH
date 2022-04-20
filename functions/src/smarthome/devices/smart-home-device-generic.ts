import {SmartHomeDeviceType} from './smart-home-device-type';
import {SmartHomeTrait} from './smart-home-trait';

export interface SmartHomeDeviceGeneric<T_State = {}, T_Attributes = {}> {
  id: string;
  type: SmartHomeDeviceType;
  traits: SmartHomeTrait[];
  name: {
    defaultNames?: string[];
    name: string;
    nicknames?: string[];
  };
  willReportState: boolean;
  notificationSupportedByAgent?: boolean;
  structureHint?: string;
  roomHint?: string;
  deviceInfo?: {
    manufacturer: string;
    model: string;
    hwVersion: string;
    swVersion: string;
  };
  otherDeviceIds?: {
    agentId?: string;
    deviceId: string;
  }[];
  customData?: {}; // TODO

  state: {
    online: boolean;
  } & T_State;
  attributes: T_Attributes;
}
