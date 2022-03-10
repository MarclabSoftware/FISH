import {InversifyExpressServer, interfaces} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import {createIoC} from '../di/setup';
import {Application} from 'express';

export function createFunctionServer<T extends interfaces.Controller>(
  ctr: new (...args: never[]) => T
): Application {
  const ioc = createIoC();
  ioc.bind<T>(Symbol.for('resr')).to(ctr);

  const server = new InversifyExpressServer(ioc);
  server.setConfig(app => {
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
  });

  const app = server.build();
  return app;
}
