import {SmartHomeV1ExecuteRequestExecution} from 'actions-on-google';

export interface ISmartHomeDeviceGeneric {
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
  online: boolean;
  getCompleteState(): {}; // For query response, complete state
  getCommandState?(command: string): {}; // For execute response, single state
  getTraitState?(trait: string): {}; // May be useful in future
  setState?(execution: SmartHomeV1ExecuteRequestExecution): void;
}

export interface ISmartHomeDeviceOutlet extends ISmartHomeDeviceGeneric {
  on: boolean;
  getCompleteState(): {on: boolean; online: boolean};
}

export interface ISmartHomeDeviceLight extends ISmartHomeDeviceGeneric {
  on: boolean;
  getCompleteState(): {on: boolean; online: boolean};
}
