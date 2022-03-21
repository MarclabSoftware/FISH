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
}
