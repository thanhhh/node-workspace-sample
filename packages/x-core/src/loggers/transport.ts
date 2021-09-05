import winston from "winston";
import { ConsoleTransportInstance } from "winston/lib/winston/transports";
import _ from 'lodash';

export const consoleTransport: ConsoleTransportInstance = new winston.transports.Console();
export const transports = _.compact([consoleTransport]);