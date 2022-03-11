import {controller} from 'inversify-express-utils';

export const GCF_NAME_ANNOTATION = 'fish:gcf-name';

export function gcfunc(funcName: string) {
  return function (target: Function) {
    Reflect.metadata(GCF_NAME_ANNOTATION, funcName)(target);
    controller('/' + funcName)(target);
  };
}
