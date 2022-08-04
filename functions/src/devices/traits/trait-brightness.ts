import {FishDevice} from '../fish-device';

export interface TraitBrightnessState {
  brightness: number;
}

export interface FishDeviceWithTraitBrightness extends FishDevice {
  state: TraitBrightnessState;
  attributes: {
    commandOnlyBrightness?: boolean;
  };
}

export const hasTraitBrightness = (
  d: FishDevice
): d is FishDeviceWithTraitBrightness => {
  return d.definition.traits.includes('action.devices.traits.Brightness');
};
