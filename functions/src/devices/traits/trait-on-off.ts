import {FishDevice} from '../fish-device';

export interface TraitOnOffState {
  on: boolean;
}

export interface FishDeviceWithTraitOnOff extends FishDevice {
  state: TraitOnOffState;
  attributes: {
    commandOnlyOnOff?: boolean;
    queryOnlyOnOff?: boolean;
  };
}

export const hasTraitOnOff = (d: FishDevice): d is FishDeviceWithTraitOnOff => {
  return d.definition.traits.includes('action.devices.traits.OnOff');
};
