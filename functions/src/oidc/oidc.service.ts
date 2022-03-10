import {IOidcService} from './i-oidc.service';
import {injectable} from 'inversify';

@injectable()
class OidcService implements IOidcService {
  hello(): string {
    return 'Hello World';
  }
}

export {OidcService};
