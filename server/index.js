import server from './server.js';
import { logger } from './util.js';

server.listen(3000).on('listening', () => logger.info('Server running'));
