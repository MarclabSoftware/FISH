import {gcfunc} from '../func/gcfunc.decorator';
import {
  BaseHttpController,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
} from 'inversify-express-utils';
import {inject} from 'inversify';
import {DI_TYPES} from '../di/types';
import {IDeviceService} from '../devices/i-device.service';
import {FishDevice} from './fish-device';
import {assign} from 'lodash';

@gcfunc('devices')
export class DevicesFunc extends BaseHttpController {
  constructor(
    @inject(DI_TYPES.DeviceService) private deviceService: IDeviceService
  ) {
    super();
  }

  @httpPost('/')
  public async addNewDevice() {
    const reqBody = this.httpContext.request.body as FishDevice;
    const objToSave = reqBody as FishDevice;
    const savedObj = await this.deviceService.save(objToSave, true);
    return this.httpContext.response.json(savedObj);
  }

  @httpGet('/')
  public async getDeviceList() {
    const deviceList = await this.deviceService.getList();
    return this.httpContext.response.json(deviceList);
  }

  @httpGet('/:deviceId')
  public async getDeviceById() {
    const deviceId = this.httpContext.request.params['deviceId'] as string;
    const objFromDb = await this.deviceService.getById(deviceId);
    if (!objFromDb) {
      this.httpContext.response.status(404);
      return this.httpContext.response.json({message: 'Device not found'});
    }

    return this.httpContext.response.json(objFromDb);
  }

  @httpPatch('/:deviceId')
  public async updateDevice() {
    const reqBody = this.httpContext.request.body as Partial<FishDevice>;
    const deviceId = this.httpContext.request.params['deviceId'] as string;
    const objFromDb = await this.deviceService.getById(deviceId);
    if (!objFromDb) {
      this.httpContext.response.status(404);
      return this.httpContext.response.json({message: 'Device not found'});
    }

    assign(objFromDb, reqBody);
    const objUpdated = await this.deviceService.save(objFromDb, false);

    return this.httpContext.response.json(objUpdated);
  }

  @httpDelete('/:deviceId')
  public async deleteById() {
    const deviceId = this.httpContext.request.params['deviceId'] as string;
    const isDeleted = await this.deviceService.deleteById(deviceId);
    if (!isDeleted) {
      this.httpContext.response.status(404);
      return this.httpContext.response.json({message: 'Device not found'});
    }

    return this.httpContext.response.json({});
  }
}
