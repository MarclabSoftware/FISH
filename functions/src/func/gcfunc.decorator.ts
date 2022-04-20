import {controller} from 'inversify-express-utils';

export const GCF_NAME_ANNOTATION = 'fish:gcf-name';

export function gcfunc(funcName: string) {
  return function (target: Function) {
    Reflect.metadata(GCF_NAME_ANNOTATION, funcName)(target);
    const funcPath = '/' + (process.env.K_SERVICE ? '' : funcName);
    controller(funcPath)(target);
    console.info(`Registered ${funcName} GCF under ${funcPath} path.`);
  };
}
