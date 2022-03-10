import 'reflect-metadata';

import {Configuration, Provider} from 'oidc-provider';
import {HttpFunction} from '@google-cloud/functions-framework';

const configuration: Configuration = {
  clients: [
    {
      client_id: 'foo',
      client_secret: 'bar',
      redirect_uris: ['https://jwt.io'],
    },
  ],
};

const oidcProvider = new Provider('http://localhost:8080', configuration);
const oidcFunc = oidcProvider.callback();

export const oidc: HttpFunction = (req, res) => {
  const newPath = req.path.replace('/oidc', '');
  req.url = newPath;
  oidcFunc(req, res);
};
