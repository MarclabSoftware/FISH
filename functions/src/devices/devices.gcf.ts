import {createGCF} from '../func/utils';
import {DevicesFunc} from './devices.func';

const GCF = createGCF<DevicesFunc>(DevicesFunc);

export {GCF};
