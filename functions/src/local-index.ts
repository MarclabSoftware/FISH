import 'reflect-metadata';

import './fakeauth/fakeauth.gcf';
import './hello-world/hello-world.gcf';
import './smarthome/google-smarthome.gcf';
import './devices/devices.gcf';

import {HttpFunction} from '@google-cloud/functions-framework';
import {registeredGCFs} from './func/utils';

export const localIndex: HttpFunction = (req, res) => {
  const funcName = req.path.split('/')[1];

  if (registeredGCFs[funcName]) {
    registeredGCFs[funcName](req, res);
  } else {
    res.send(`function not defined (${req.path})`);
  }
};
