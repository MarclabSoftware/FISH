import bodyParser from 'body-parser';
import express, {Application, Router} from 'express';
import {GCF} from './gcf';

export function createGCF(gcfName: string, router: Router): GCF {
  const app = express();
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  const prefixRouter = Router();
  prefixRouter.use(`/${gcfName}`, router);
  app.use(prefixRouter);

  return <GCF>{
    name: gcfName,
    handler: app,
  };
}
