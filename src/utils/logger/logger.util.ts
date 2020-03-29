import { Service, Container } from 'typedi';
import { format, createLogger, addColors, transports } from 'winston';
import { LoggerConfigInterface } from './logger.interface';


@Service()
class Logger {
    private config: LoggerConfigInterface;
    public enabled: boolean;
    private logger: any;

    constructor() {
        this.config = Container.get<any>('config').logger;
        this.enabled = this.config.enabled;

        this.logger = createLogger({
            format: format.combine(
                format.colorize(),
                format.splat(),
                format.simple(),
                format.timestamp(),
                format.align(),
                format.printf((info) => {
                    return `${info.timestamp} ${info.level}: ${info.message}`
                }),
            ),
            levels: this.config.levels,
            transports: [
                new transports.Console(),
            ],
            silent: this.config.silent
        });

        addColors(this.config.colors);
    }

    /**
     * Log
     * @param level {String} - Log Level 
     * @param title {String} - Title / Name / ID
     * @param message {String} - Message
     * @param data {Object} - Custom Data
     */
    log(level: string, title: string='', message: string='', data: object={}) {
        const suffix = JSON.stringify(data);
        const options = {
            level,
            message: `[${title}] ${message} ${suffix.length > 2 ? suffix : ''}`
        };
        return this.logger.log(options);
    }

}

export default Logger;