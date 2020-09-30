import http from 'http';
import { createServer } from './app';
import logger from './app/services/logger';

function init() {
  try {

    const server = http.createServer(createServer().callBack());
    const PORT = process.env.PORT || 8000;

    server.listen(PORT, () => logger.info(`Server started at PORT ${PORT}`))

  } catch (error) {
    logger.error(error);
  }
}

init();