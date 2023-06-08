import { Express } from 'express';
import router from './admin';

export default (app: Express) => {
  app.use('/', router);
  //app.use(request.notFound);
};