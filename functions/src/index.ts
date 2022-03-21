import 'reflect-metadata';

import {FakeAuthFunc} from './fakeauth/fakeauth.func';
import {createGCF, registeredGCFs} from './func/utils';
import {HelloWorldFunc} from './hello-world/hello-world.func';
import {GoogleSmartHomeFunc} from './smarthome/google-smart-home.func';

const helloWorld = createGCF<HelloWorldFunc>(HelloWorldFunc);
const googleSmarthome = createGCF<GoogleSmartHomeFunc>(GoogleSmartHomeFunc);
const fakeAuth = createGCF<FakeAuthFunc>(FakeAuthFunc);

export {registeredGCFs, helloWorld, googleSmarthome, fakeAuth};
