import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';
import {injectable} from 'inversify';
import {
  dummyDevicesList,
  dummyDevicesMap,
  agentUserId,
} from '../dummy-datastore';

@injectable()
export class SmartHomeDeviceUtils {
  // For execute response, single state
  getStateByCommand(id: string, command: string): {} {
    switch (command) {
      case 'action.devices.commands.OnOff':
        return {
          on: dummyDevicesMap[id].state.on,
        };
      default:
        return {}; //FIXME
    }
  }

  // May be useful in future
  getStateByTrait(id: string, trait: string): {} {
    switch (trait) {
      case 'action.devices.traits.OnOff':
        return {
          on: dummyDevicesMap[id].state.on,
        };
      default:
        return {}; //FIXME
    }
  }

  performExecute(
    id: string,
    execution: SmartHomeV1ExecuteRequestExecution
  ): {} {
    switch (execution.command) {
      case 'action.devices.commands.OnOff':
        dummyDevicesMap[id].state.on =
          execution.params?.on ?? dummyDevicesMap[id].state.on;
        break;

      default:
        break;
    }
    return this.getStateByCommand(id, execution.command);
  }
}
