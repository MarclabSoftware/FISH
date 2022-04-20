import {SmartHomeDebugDevice} from './devices/smart-home-debug-device';
//import {SmartHomeDevice} from './devices/smart-home-device';
import {SmartHomeDeviceGeneric} from './devices/smart-home-device-generic';

/*
Simulate a datastore list of devices, used for debug
[Device Object 1, Device Object 2, ...]
*/
export const dummyDevicesList: any[] = [
  new SmartHomeDebugDevice(),
  new SmartHomeDebugDevice(),
  new SmartHomeDebugDevice(),
  //...
];

/*
Convert the list of devices in an IDs based object
{id: Device Object, id2: Device Object 2, ...}
*/
export const dummyDevicesMap: {[key: string]: any} = dummyDevicesList.reduce(
  (obj: {[key: string]: any}, item: any) => ((obj[item.id] = item), obj),
  {}
);

export const agentUserId = 'dummy_FISH_AUID';
