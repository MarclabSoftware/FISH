import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {helloWorld} from './functions/hello-world/hello-world';
import {fakeauth, faketoken, login} from './functions/oauth/oauth';
import {googleSmarthome} from './functions/smarthome/google-smarthome';

export const localIndex: HttpFunction = (req, res) => {
  switch (req.path) {
    case '/hello-world':
      return helloWorld(req, res);

    case '/oauth/login':
      return login(req, res);

    case '/oauth/fakeauth':
      return fakeauth(req, res);

    case '/oauth/faketoken':
      return faketoken(req, res);

    case '/google-smarthome':
      return googleSmarthome(req, res);

    default:
      res.send(`function not defined (${req.path})`);
  }
};
