import {ISmartHomeDeviceOutlet} from './i-smarthome-devices';
import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';
import {injectable} from 'inversify';

@injectable()
export class SmartHomeDeviceOutlet implements ISmartHomeDeviceOutlet {
  key: number; // For dummy names/ID
  static lastKey = 0; // For dummy names/ID

  id: string;
  type = 'action.devices.types.OUTLET';
  requiredTraits = ['action.devices.types.OUTLET'];
  finalTraits: string[];
  name: string;
  defaultNames = [];
  nickNames = [];
  willReportSTate = true;
  manufacturer = 'FISH by Marclab';
  model = 'Dummy outlet';
  hwVersion = '1.0';
  swVersion = '0.1';
  online = true;

  on = false;

  constructor() {
    this.key = ++SmartHomeDeviceOutlet.lastKey;
    this.id = `dummy_FISH_outlet_${this.key}`;
    this.name = `Dummy FISH outlet ${this.key}`;
    this.finalTraits = this.requiredTraits;
  }

  setState?(execution: SmartHomeV1ExecuteRequestExecution): {} {
    switch (execution.command) {
      case 'action.devices.commands.OnOff':
        this.on = execution.params?.on || this.on; // FIXME: check this
        break;

      default:
        break;
    }
    return this.getCommandState(execution.command); // FIXME: check this
  }

  getCompleteState(): {on: boolean; online: boolean} {
    return {
      on: this.on,
      online: this.online,
    };
  }

  getTraitState(trait: string): {} {
    switch (trait) {
      case 'action.devices.traits.OnOff':
        return {
          on: this.on,
        };
      default:
        return {}; //FIXME
    }
  }

  getCommandState(command: string): {} {
    switch (command) {
      case 'action.devices.commands.OnOff':
        return {
          on: this.on,
        };
      default:
        return {}; //FIXME
    }
  }
}
