import {createGCF} from '../func/utils';
import {GoogleSmarthomeFunc} from './google-smarthome.func';

const GCF = createGCF<GoogleSmarthomeFunc>(GoogleSmarthomeFunc);

export {GCF, GCF as googleSmarthome};
