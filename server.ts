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
import expressEjsLayouts from 'express-ejs-layouts'
const app = express();

/** EJS Layout Configurations */
app.use(expressEjsLayouts)
app.set("layout extractScripts", true)
app.set("style extractStyles", true)
app.set('views', './views');
app.set('view engine', 'ejs');

/** Session */
app.use(
  session({
    secret: 'asd!ajsfkjuih12h3u1h',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000,
    }
  }),
);

/** Middlewares */
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Default statuc file directory */
app.use(express.static(__dirname + '/public'));


/** Start server */
app.listen(config.port, config.host, () => {
  info(`Server Listing At http://${config.host}:${config.port}`);
  routers(app);

});

export default app;