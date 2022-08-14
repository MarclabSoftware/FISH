import {Application} from 'express';

export interface GCF {
  name: string;
  handler: Application;
}
