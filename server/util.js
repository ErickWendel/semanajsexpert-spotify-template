import pino from 'pino';

export const logger = pino({
  enabled: process.env.LOG_DISABLED !== 'true',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
