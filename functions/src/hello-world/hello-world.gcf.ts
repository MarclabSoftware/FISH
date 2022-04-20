import {createGCF} from '../func/utils';
import {HelloWorldFunc} from './hello-world.func';

const GCF = createGCF<HelloWorldFunc>(HelloWorldFunc);

export {GCF, GCF as helloWorld};
