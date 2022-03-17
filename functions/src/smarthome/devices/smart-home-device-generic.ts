import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';

export interface SmartHomeDeviceGeneric {
  id: string;
  type: string;
  requiredTraits: string[];
  otherTraits?: string[];
  finalTraits: string[];
  defaultNames?: string[];
  nickNames?: string[];
  name: string;
  willReportSTate: boolean;
  manufacturer: string;
  model: string;
  hwVersion: string;
  swVersion: string;
  state: {
    online: boolean;
  };
  getCommandState?(command: string): {}; // For execute response, single state
  getTraitState?(trait: string): {}; // May be useful in future
  setState?(execution: SmartHomeV1ExecuteRequestExecution): void;
}
