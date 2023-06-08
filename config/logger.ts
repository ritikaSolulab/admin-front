const log = require('log-to-file');
import moment from 'moment';
import fs from 'fs';

const errorDir = 'logs';
class logger {
  constructor() {}
  static today = () => {
    return moment().format('YYYY-MM-DD');
  };
  static customLog = (message: string, defaultLog: string) => {
    const date = this.today();
    const logDir = errorDir + '/' + defaultLog;

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, {
        recursive: true,
      });
    }
    const errorDirPath = logDir + '/' + defaultLog + '-' + date + '.log';
    log(message, errorDirPath);
    console.log(message);
    return;
  };
}

export const info = (message: string) => logger.customLog(message, 'info');
export const redis = (message: string) => logger.customLog(message, 'redis');
export const error = (message: string) => logger.customLog(message, 'error');
export const debug = (message: string) => logger.customLog(message, 'debug');
export const cron = (message: string) => logger.customLog(message, 'cron');
export const webhook = (message: string) =>
  logger.customLog(message, 'webhook');
