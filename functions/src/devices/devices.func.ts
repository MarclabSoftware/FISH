import {assign} from 'lodash-es';
import {Router} from 'express';

import {DeviceService} from '../devices/device.service.js';
import {FishDevice} from './fish-device.js';
import {createGCF} from '../func/utils.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      device?: FishDevice;
    }
  }
}

const deviceService = new DeviceService();
const router = Router();

// preload device on routes with ':deviceId'
router.param('deviceId', async (req, res, next, deviceId: string) => {
  const dev = await deviceService.getById(deviceId);
  if (!dev) {
    res.status(404);
    return res.json({message: 'Device not found'});
  }

  req.device = dev;
  return next();
});

// add new device
router.post('/', async (req, res) => {
  const reqBody = req.body as FishDevice;
  const objToSave = reqBody as FishDevice;
  const savedObj = await deviceService.create(objToSave);
  res.status(201);
  return res.json(savedObj);
});

// get devices
router.get('/', async (_, res) => {
  const deviceList = await deviceService.getList();
  return res.json(deviceList);
});

// get device by id
router.get('/:deviceId', async (req, res) => {
  return res.json(req.device);
});

// update device
router.patch('/:deviceId', async (req, res) => {
  const reqBody = req.body as Partial<FishDevice>;
  const toSave = assign(req.device, reqBody);
  const objUpdated = await deviceService.update(toSave);
  return res.json(objUpdated);
});

// delete device
router.delete('/:deviceId', async (req, res) => {
  await deviceService.deleteById(req.device!.id);
  return res.sendStatus(204);
});

export default createGCF('devices', router);
