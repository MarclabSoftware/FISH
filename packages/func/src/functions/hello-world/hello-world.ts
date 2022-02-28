import type {HttpFunction} from '@google-cloud/functions-framework';

export const helloWorld: HttpFunction = (req, res) => {
  res.send('Hello, World');
};
