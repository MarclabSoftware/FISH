import {SmartHomeDeviceGenericOutlet} from './smart-home-device-generic-outlet';
import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';
import {injectable} from 'inversify';

@injectable()
export class SmartHomeDeviceOutlet implements SmartHomeDeviceGenericOutlet {
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

  state = {
    online: true,
    on: false,
  };

  constructor() {
    this.key = ++SmartHomeDeviceOutlet.lastKey;
    this.id = `dummy_FISH_outlet_${this.key}`;
    this.name = `Dummy FISH outlet ${this.key}`;
    this.finalTraits = this.requiredTraits;
  }

  setState?(execution: SmartHomeV1ExecuteRequestExecution): {} {
    switch (execution.command) {
      case 'action.devices.commands.OnOff':
        this.state.on = execution.params?.on || this.state.on; // FIXME: check this
        break;

      default:
        break;
    }
    return this.getCommandState(execution.command); // FIXME: check this
  }

  getTraitState(trait: string): {} {
    switch (trait) {
      case 'action.devices.traits.OnOff':
        return {
          on: this.state.on,
        };
      default:
        return {}; //FIXME
    }
  }

  getCommandState(command: string): {} {
    switch (command) {
      case 'action.devices.commands.OnOff':
        return {
          on: this.state.on,
        };
      default:
        return {}; //FIXME
    }
  }
}
