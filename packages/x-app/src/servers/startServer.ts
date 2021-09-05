import express from 'express';
import {getLogger} from 'x-core';
import moment from 'moment';

const logger = getLogger('startServer');

export const startServer = () => {
  const port = +(process.env.SERVER_POST || 3000);

  logger.debug('process.env.SERVER_POST: ', port);

  const app = express();
  app.get('/', (req, res) => {
    res.send('HELLO WORLD!!!!!');
  });

  app.listen(port ,() => {    
    const test = {
      test: 'test',
      timestamp: 'YYYY-MM-DD-SS hh:mm:ss.SSS',
    };
    const timeStampNow = moment().format('YYYY-MM-DD-SS hh:mm:ss.SSS');
    logger.info(`App server started at http://localhost:${port}/`);
    
  
    logger.debug('result: ', test);
    logger.warning('dateTimeNow: ', timeStampNow);
    if (process.env.TEST_STARTUP) {
      process.exit(0);
    }
  });
}