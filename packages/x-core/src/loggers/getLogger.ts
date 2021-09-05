import _ from 'lodash';
import * as os from 'os';
import * as winston from 'winston';

import {transports} from './transport';

const tagConfig = 'debug';
const defaultLevel = 'debug';
const defaultTag = 'tag';
const {colors} = winston.config.cli;
const {levels} = winston.config.syslog;
winston.addColors(colors);

function loggerMessage(msg: string): string {
  const hostname = os.hostname();
  return msg + ' [' + hostname + ']';
}

export const getLogger = (tag: string) => {
  const tagLevel = _.get(tagConfig, tag, defaultLevel);
  const outPutTag = defaultTag + '-' + tag;
  const enabledLevels = _.pickBy(levels, levelNum => levelNum <= levels[tagLevel]);
  const logger = winston.createLogger({
    levels,
    level: tagLevel,
    format: winston.format.json(),
    transports,
  });

  const log = (level: string) =>
    _.has(enabledLevels, level)
      ? (msg: string, meta = {}) => logger.log(level, loggerMessage(msg), {tag: outPutTag, ...meta})
      : _.noop;

  return _.mapValues(levels, (_, level) => log(level));
};
