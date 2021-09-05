import { startServer } from './servers/startServer';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { getLogger } from 'x-core';

const logger = getLogger('app');

logger.info('NODE_ENV : ' + process.env.NODE_ENV);

var configFile = `.env.${process.env.NODE_ENV}`;

const configPath = resolve(__dirname, configFile);

logger.info('Config Path : ' +configPath);

dotenv.config({path:configPath });

startServer();
