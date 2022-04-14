import {createGCF} from '../func/utils';
import {FakeAuthFunc} from './fakeauth.func';

const GCF = createGCF<FakeAuthFunc>(FakeAuthFunc);

export {GCF, GCF as fakeAuth};
