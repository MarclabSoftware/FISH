import {fakeauth, faketoken, login} from './functions/oidc/oauth';
import {HttpFunction} from '@google-cloud/functions-framework';
import {googleSmarthome} from './functions/smarthome/google-smarthome';
import {helloWorld} from './hello-world/hello-world.func';
import {oidc} from './functions/oidc/oidc';

export const localIndex: HttpFunction = (req, res) => {
  if (req.path === '/hello-world') {
    return helloWorld(req, res);
  } else if (req.path === '/oauth/login') {
    return login(req, res);
  } else if (req.path === '/oauth/fakeauth') {
    return fakeauth(req, res);
  } else if (req.path === '/oauth/faketoken') {
    return faketoken(req, res);
  } else if (req.path === '/google-smarthome') {
    return googleSmarthome(req, res);
  } else if (req.path.startsWith('/oidc')) {
    return oidc(req, res);
  } else {
    res.send(`function not defined (${req.path})`);
  }
};
