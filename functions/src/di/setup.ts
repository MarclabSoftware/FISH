import {Container} from 'inversify';
import {DI_TYPES} from './types';
import {HelloWorldService} from '@marclabsoftware/fish-common/src/hello-world.service';

export function createIoC(): Container {
  const ioc = new Container();
  ioc.bind<HelloWorldService>(DI_TYPES.HelloWorld).to(HelloWorldService);
  return ioc;
}
