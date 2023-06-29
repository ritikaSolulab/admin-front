import winston from 'winston';

const timezoned = () => {
  return new Date().toLocaleString()
};
export const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.label({ label: '[LOGGER]' }),
    winston.format.timestamp({ format: timezoned }),
    winston.format.printf(log => ` ${log.label}  ${log.timestamp}  ${log.level} : ${log.message} ${log.stack ?? ''}`)
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true })
      ),
      level: 'info' 
    }),
    new winston.transports.File({
      filename: './logs/error.log', level: 'error',
      maxsize: 1000000,
      maxFiles: 20,
      tailable: true,
      zippedArchive: true
    }),
  ]
});
export const info =(msg: string) => Logger.info(msg);
export const error = (msg: string) => Logger.error(msg);
export const debug = (msg: string) => Logger.debug(msg);
export const cron = (msg: string) => Logger.info(msg);
export const webhook = (msg: string) => Logger.info(msg);