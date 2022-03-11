import {InversifyExpressServer, interfaces} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import {createIoC} from '../di/setup';
import {Application} from 'express';
import {GCF_NAME_ANNOTATION} from './gcfunc.decorator';

const registeredGCFs: {[key: string]: Application} = {};

export function createGCF<T extends interfaces.Controller>(
  ctr: new (...args: never[]) => T
): Application {
  const ioc = createIoC();
  ioc.bind<T>(Symbol.for(ctr.name)).to(ctr);

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
  const gcfName = Reflect.getMetadata(GCF_NAME_ANNOTATION, ctr);
  Reflect.metadata(GCF_NAME_ANNOTATION, gcfName)(app);

  registeredGCFs[gcfName] = app;

  return app;
}

export {registeredGCFs};
