import { Express, Request } from 'express';
import router from './auth';
import adminRouter from './admin';

export default (app: Express) => {
  app.use('/', router);
  app.use('/admin', adminRouter);
};