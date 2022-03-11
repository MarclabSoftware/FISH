import 'reflect-metadata';

import {FakeAuthFunc} from './fakeauth/fakeauth.func';
import {createGCF, registeredGCFs} from './func/utils';
import {HelloWorldFunc} from './hello-world/hello-world.func';
import {GoogleSmarthomeFunc} from './smarthome/google-smarthome.func';

const helloWorld = createGCF<HelloWorldFunc>(HelloWorldFunc);
const googleSmarthome = createGCF<GoogleSmarthomeFunc>(GoogleSmarthomeFunc);
const fakeAuth = createGCF<FakeAuthFunc>(FakeAuthFunc);

export {registeredGCFs, helloWorld, googleSmarthome, fakeAuth};
