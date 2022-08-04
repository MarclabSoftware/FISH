// eslint-disable-next-line node/no-unpublished-import
import {keys} from 'ts-transformer-keys';
import {FishDeviceTrait} from './traits/fish-device-trait';
import {FishDeviceType} from './types/fish-device-type';

export interface FishDevice {
  id: string;
  definition: FishDeviceDefinition;
  attributes: object;
  state: object;
  online: boolean;
}

export const FishDeviceKeys = keys<FishDevice>();

export interface FishDeviceDefinition {
  type: FishDeviceType;
  traits: FishDeviceTrait[];
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
  customData?: {}; // FIXME: What do we insert here?
}
