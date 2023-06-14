import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import cookieParser from 'cookie-parser';
import routers from './router/index';
import { info } from './config/logger';
import path from 'path';
const app = express();

//view engine setup
// app.set('views', path.join(__dirname, '../', 'views'));
app.set('views', './views');
app.set('view engine', 'ejs');

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