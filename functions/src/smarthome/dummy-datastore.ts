import {SmartHomeDeviceGeneric} from './devices/smart-home-device-generic';
import {SmartHomeDeviceOutlet} from './devices/smart-home-devices';

/*
Simulate a datastore list of devices, used for debug
[Device Object 1, Device Object 2, ...]
*/
export const dummyDevicesList:SmartHomeDeviceGeneric[] = [
  new SmartHomeDeviceOutlet(),
  new SmartHomeDeviceOutlet(),
  new SmartHomeDeviceOutlet(),
  //...
];

/* 
Convert the list of devices in an IDs based object 
{id: Device Object, id2: Device Object 2, ...}
*/
export const dummyDevicesMap = dummyDevicesList.reduce(
  (obj: any, item: SmartHomeDeviceGeneric) => ((obj[item.id] = item), obj),
  {}
);

export const agentUserId = 'dummy_FISH_AUID';
