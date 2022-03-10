import {Container} from 'inversify';
import {DI_TYPES} from './types';
import {HelloWorldService} from '@marclabsoftware/fish-common/src/hello-world.service';
import {IOidcService} from '../oidc/i-oidc.service';
import {OidcService} from '../oidc/oidc.service';

export function createIoC(): Container {
  const ioc = new Container();
  ioc.bind<IOidcService>(DI_TYPES.Oidc).to(OidcService);
  ioc.bind<HelloWorldService>(DI_TYPES.HelloWorld).to(HelloWorldService);
  return ioc;
}
