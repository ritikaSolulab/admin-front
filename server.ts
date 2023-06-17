import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import cookieParser from 'cookie-parser';
import routers from './router/index';
import { info } from './config/logger';
import session  from 'express-session';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts'
const app = express();

app.use(expressEjsLayouts)
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'asd!ajsfkjuih12h3u1h',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000
    }
  }),
);
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


app.listen(config.port, config.host, () => {
  info(`Server Listing At http://${config.host}:${config.port}`);
  routers(app);

});

export default app;