import {injectable} from 'inversify';

@injectable()
export class HelloWorldService {
  getGreeting(name: string) {
    return `Hello ${name}!`;
  }
}
