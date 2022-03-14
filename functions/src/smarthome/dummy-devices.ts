import {ISmartHomeDeviceGeneric} from './i-smarthome-devices';
import {SmartHomeDeviceOutlet} from './smarthome-devices';

export const dummyDevices: ISmartHomeDeviceGeneric[] = [
  new SmartHomeDeviceOutlet(),
  new SmartHomeDeviceOutlet(),
];
export const agentUserId = 'dummy_FISH_AUID';
