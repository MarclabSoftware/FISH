import 'reflect-metadata';

import type {HttpFunction} from '@google-cloud/functions-framework';
import * as express from 'express';
import {inject} from 'inversify';
import {
  controller,
  httpGet,
  interfaces,
  next,
  request,
  response,
} from 'inversify-express-utils';
import {HelloWorldService} from '@marclabsoftware/fish-common/src/hello-world.service';
import {DI_TYPES} from '../di/types';
import {createFunctionServer} from '../server/utils';

@controller('/hello-world')
class HelloWorldFunc implements interfaces.Controller {
  constructor(
    @inject(DI_TYPES.HelloWorld) private helloWorldService: HelloWorldService
  ) {}

  @httpGet('/')
  private index(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): string {
    return this.helloWorldService.getGreeting('FISH');
  }
}

const helloWorldApp = createFunctionServer<HelloWorldFunc>(HelloWorldFunc);

export const helloWorld: HttpFunction = (req, res) => {
  helloWorldApp(req, res);
};
