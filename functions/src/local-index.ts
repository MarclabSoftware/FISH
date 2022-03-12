import {HttpFunction} from '@google-cloud/functions-framework';
import {registeredGCFs} from '.';

export const localIndex: HttpFunction = (req, res) => {
  const funcName = req.path.split('/')[1];

  if (registeredGCFs[funcName]) {
    registeredGCFs[funcName](req, res);
  } else {
    res.send(`function not defined (${req.path})`);
  }
};