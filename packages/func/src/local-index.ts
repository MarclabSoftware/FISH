import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {helloWorld} from './functions/hello-world/hello-world';

export const localIndex: HttpFunction = (req, res) => {
  switch (req.path) {
    case '/hello-world':
      return helloWorld(req, res);
    default:
      res.send('function not defined');
  }
};
