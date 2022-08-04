import {FishDevice} from './fish-device';

export interface IDeviceService {
  save(device: FishDevice, isNew: boolean): Promise<FishDevice>;
  getList(): Promise<FishDevice[]>;
  getById(deviceId: string): Promise<FishDevice | undefined>;
  deleteById(deviceId: string): Promise<boolean>;
  getUserDevices(userId: string): Promise<FishDevice[]>;
}
