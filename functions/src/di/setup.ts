import {Container} from 'inversify';
import {DI_TYPES} from './types';
import {HelloWorldService} from '@marclabsoftware/fish-common/src/hello-world.service';
import {DeviceService} from '../devices/device.service';
import {IDeviceService} from '../devices/i-device.service';

export function createIoC(): Container {
  const ioc = new Container();
  ioc.bind<HelloWorldService>(DI_TYPES.HelloWorld).to(HelloWorldService);
  ioc.bind<IDeviceService>(DI_TYPES.DeviceService).to(DeviceService);
  return ioc;
}
