import {injectable} from 'inversify';
import {SmartHomeDeviceGenericOnOff} from './smart-home-device-generic-onoff';
import {SmartHomeDeviceType} from './smart-home-device-type';
import {SmartHomeTrait} from './smart-home-trait';

@injectable()
export class SmartHomeDebugDevice implements SmartHomeDeviceGenericOnOff {
  type: SmartHomeDeviceType = 'action.devices.types.OUTLET';
  traits: SmartHomeTrait[] & ['action.devices.traits.OnOff'] = [
    'action.devices.traits.OnOff',
  ];
  willReportState = true;
  notificationSupportedByAgent?: boolean | undefined;
  structureHint?: string | undefined;
  roomHint?: string | undefined;
  deviceInfo?:
    | {
        manufacturer: string;
        model: string;
        hwVersion: string;
        swVersion: string;
      }
    | undefined;
  otherDeviceIds?:
    | {agentId?: string | undefined; deviceId: string}[]
    | undefined;
  customData?: {} | undefined;
  state: {online: boolean} & {on: boolean} = {
    on: true,
    online: true,
  };
  attributes: {
    commandOnlyOnOff?: boolean | undefined;
    queryOnlyOnOff?: boolean | undefined;
  } = {};

  key: number; // For dummy names/ID
  static lastKey = 0; // For dummy names/ID
  id: string;
  name: {
    defaultNames?: string[] | undefined;
    name: string;
    nicknames?: string[] | undefined;
  };

  constructor() {
    this.key = ++SmartHomeDebugDevice.lastKey;
    this.id = `dummy_FISH_outlet_${this.key}`;
    this.name = {name: `Dummy FISH outlet ${this.key}`};
  }
}
