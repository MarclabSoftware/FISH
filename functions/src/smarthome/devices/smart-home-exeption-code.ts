// Google Smart Home Error codes
// https://developers.google.com/assistant/smarthome/reference/errors-exceptions#exception_list
export type SmartHomeExeptionCode =
  | 'bagFull'
  | 'binFull'
  | 'carbonMonoxideDetected'
  | 'deviceAtExtremeTemperature'
  | 'deviceJammingDetected'
  | 'deviceMoved'
  | 'deviceOpen'
  | 'deviceTampered'
  | 'deviceUnplugged'
  | 'floorUnreachable'
  | 'hardwareFailure'
  | 'inSoftwareUpdate'
  | 'isBypassed'
  | 'lowBattery'
  | 'motionDetected'
  | 'needsPads'
  | 'needsSoftwareUpdate'
  | 'needsWater'
  | 'networkJammingDetected'
  | 'noIssuesReported'
  | 'roomsOnDifferentFloors'
  | 'runCycleFinished'
  | 'securityRestriction'
  | 'smokeDetected'
  | 'tankEmpty'
  | 'usingCellularBackup'
  | 'waterLeakDetected';