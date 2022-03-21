import {SmartHomeDeviceGenericOutlet} from './smart-home-device-generic-outlet';
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
}
