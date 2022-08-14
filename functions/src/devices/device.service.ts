import {pick} from 'lodash-es';
import {FishDevice, FishDeviceKeys} from './fish-device.js';
import {hasTraitOnOff} from './traits/trait-on-off';
import {hasTraitBrightness} from './traits/trait-brightness';
import {randomUUID} from 'crypto';

import {getFirestore} from 'firebase-admin/firestore';
import {firebaseApp} from '../firebase/firebase.js';

export class DeviceService {
  private static readonly CollectionName = 'devices';

  private firestore = getFirestore(firebaseApp);

  async create(device: FishDevice): Promise<FishDevice> {
    device.id = randomUUID();
    await this.firestore
      .collection(DeviceService.CollectionName)
      .doc(device.id)
      .set(device);
    return device;
  }

  async update(device: Partial<FishDevice>): Promise<FishDevice> {
    if (!device.id) {
      throw new Error('Cannot update device if field "id" id not passed.');
    }

    await this.firestore
      .collection(DeviceService.CollectionName)
      .doc(device.id)
      .set(device, {merge: true});

    const res = await this.getById(device.id);
    if (!res) {
      throw new Error('There was an error updating device.');
    }

    return res;
  }

  async getList(): Promise<FishDevice[]> {
    const docsSnap = await this.firestore
      .collection(DeviceService.CollectionName)
      .get();
    const data = docsSnap.docs.map(x => x.data());
    const devices = data.map(x => pick(x, FishDeviceKeys) as FishDevice);
    return devices;
  }

  async getById(deviceId: string): Promise<FishDevice | undefined> {
    const docSnap = await this.firestore
      .collection(DeviceService.CollectionName)
      .doc(deviceId)
      .get();
    if (!docSnap.exists) {
      return undefined;
    }

    const data = docSnap.data();
    const device = pick(data, FishDeviceKeys) as FishDevice;
    return device;
  }

  async deleteById(deviceId: string): Promise<boolean> {
    const doc = this.firestore
      .collection(DeviceService.CollectionName)
      .doc(deviceId);

    await doc.delete();
    return true;
  }
}
