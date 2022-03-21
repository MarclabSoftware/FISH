import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';
import {injectable} from 'inversify';
import {SmartHomeDeviceGeneric} from './smart-home-device-generic';

@injectable()
export class SmartHomeDeviceUtils {
  devices: SmartHomeDeviceGeneric[];

  constructor(devices: SmartHomeDeviceGeneric[]) {
    this.devices = devices;
  }

  // For execute response, single state
  getCommandState(id: string, command: string): {} {
    return {};
  }
  // May be useful in future
  getTraitState(id: string, trait: string): {} {
    return {};
  }
  performExecute(
    id: string,
    execution: SmartHomeV1ExecuteRequestExecution
  ): void {}
}
