import {HttpFunction} from '@google-cloud/functions-framework';
import {Application} from 'express';

import devices from './devices/devices.func.js';
import fakeauth from './fakeauth/fakeauth.func.js';
import smarthome from './smarthome/google-smarthome.func.js';
import version from './version/version.func.js';

const funcToRegister = [devices, fakeauth, smarthome, version];

const registeredGCFs: {[key: string]: Application} = {};

for (const funcReg of funcToRegister) {
  registeredGCFs[funcReg.name] = funcReg.handler;
  console.info(`Registered function '${funcReg.name}'.`);
}

const localIndex: HttpFunction = (req, res) => {
  const funcName = req.path.split('/')[1];
  if (registeredGCFs[funcName]) {
    registeredGCFs[funcName](req, res);
  } else {
    res.send(`function not defined (${req.path})`);
  }
};

export default localIndex;
