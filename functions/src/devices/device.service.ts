import {Datastore} from '@google-cloud/datastore';
import {injectable} from 'inversify';
import {pick} from 'lodash';
import {IDeviceService} from './i-device.service';
import {FishDevice, FishDeviceKeys} from './fish-device';
import {hasTraitOnOff} from './traits/trait-on-off';
import {hasTraitBrightness} from './traits/trait-brightness';
import {randomUUID} from 'crypto';

@injectable()
export class DeviceService implements IDeviceService {
  private static readonly DatastoreKind = 'Devices';

  private datastore = new Datastore();

  async save(device: FishDevice, isNew: boolean): Promise<FishDevice> {
    if (isNew) {
      device.id = randomUUID();
    }

    const deviceKey = this.datastore.key([
      DeviceService.DatastoreKind,
      device.id,
    ]);
    const dev = {
      key: deviceKey,
      data: device,
    };

    await this.datastore.save(dev);
    return device;
  }

  async getList(): Promise<FishDevice[]> {
    const query = this.datastore.createQuery(DeviceService.DatastoreKind);
    const [entities] = await this.datastore.runQuery(query);
    const devices = entities.map(x => pick(x, FishDeviceKeys) as FishDevice);
    return devices;
  }

  async getById(deviceId: string): Promise<FishDevice | undefined> {
    const deviceKey = this.datastore.key([
      DeviceService.DatastoreKind,
      deviceId,
    ]);
    const entities = await this.datastore.get(deviceKey);
    if (entities[0] === undefined) {
      return undefined;
    }

    const device = pick(entities[0], FishDeviceKeys) as FishDevice;
    return device;
  }

  async deleteById(deviceId: string): Promise<boolean> {
    const objFromDb = await this.getById(deviceId);
    if (!objFromDb) {
      return false;
    }

    const deviceKey = this.datastore.key([
      DeviceService.DatastoreKind,
      deviceId,
    ]);
    await this.datastore.delete(deviceKey);
    return true;
  }

  async getUserDevices(userId: string): Promise<FishDevice[]> {
    const query = this.datastore.createQuery(DeviceService.DatastoreKind);
    const [entities] = await this.datastore.runQuery(query);
    const devices = entities.map(x => pick(x, FishDeviceKeys) as FishDevice);

    const test = <FishDevice>{
      id: 'TEST',
      definition: {
        name: {
          defaultNames: ['TEST'],
        },
        traits: ['action.devices.traits.OnOff'],
        type: 'action.devices.types.OUTLET',
        willReportState: true,
      },
      attributes: {},
      state: {
        on: false,
      },
      online: true,
    };

    if (hasTraitOnOff(test)) {
      console.log('ok');
      console.log(test.state.on);
    }

    const test2 = <FishDevice>{
      id: 'TEST2',
      definition: {
        name: {
          defaultNames: ['TEST2'],
        },
        traits: [
          'action.devices.traits.Brightness',
          'action.devices.traits.OnOff',
        ],
        type: 'action.devices.types.LIGHT',
        willReportState: true,
      },
      attributes: {},
      state: {
        on: true,
        brightness: 100,
      },
      online: true,
    };

    if (hasTraitBrightness(test2)) {
      console.log('ok');
      console.log(test2.state.brightness);
    }

    return devices;
  }
}
