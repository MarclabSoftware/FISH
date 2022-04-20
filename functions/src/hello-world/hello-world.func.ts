import {inject} from 'inversify';
import {BaseHttpController, httpGet} from 'inversify-express-utils';
import {HelloWorldService} from '@marclabsoftware/fish-common/src/hello-world.service';
import {DI_TYPES} from '../di/types';
import {gcfunc} from '../func/gcfunc.decorator';

@gcfunc('hello-world')
export class HelloWorldFunc extends BaseHttpController {
  constructor(
    @inject(DI_TYPES.HelloWorld) private helloWorldService: HelloWorldService
  ) {
    super();
  }

  @httpGet('/')
  private index() {
    return this.json({
      msg: this.helloWorldService.getGreeting('FISH'),
    });
  }
}
