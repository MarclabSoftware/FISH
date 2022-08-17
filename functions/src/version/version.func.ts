import {Router} from 'express';
import {createGCF} from '../func/utils.js';
import {getVersionFromPackageJson} from './version.utils.js';

const router = Router();

router.get('/', (_, res) => {
  res.json({version: getVersionFromPackageJson()});
});

export default createGCF('version', router);
