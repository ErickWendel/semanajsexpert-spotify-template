import { join } from 'path';
import config from './config.js';
import { Controller } from './controller.js';
import { logger } from './util.js';

const controller = new Controller();
const { pages, location } = config;

async function routes(request, response) {
  const { headers, method, url } = request;

  if (method === 'GET' && url === '/') {
    response.writeHead(302, { Location: location.home });
    return response.end();
  }

  if (method === 'GET' && url === '/controller') {
    const { stream } = await controller.getFileStream(pages.controllerHTML);

    return stream.pipe(response);
  }

  if (method === 'GET' && url === '/home') {
    const { stream } = await controller.getFileStream(pages.homeHTML);

    return stream.pipe(response);
  }

  // Request for files
  if (method === 'GET') {
    const { stream } = await controller.getFileStream(url);

    return stream.pipe(response);
  }

  response.writeHead(404);
  return response.end();
}

function handleError(response) {
  return function (error) {
    if (error.message.includes('ENOENT')) {
      logger.warn(`File not found: ${error.stack}`);
      response.writeHead(404);
      return response.end();
    }

    logger.error(error.stack);
    response.writeHead(500);
    return response.end();
  };
}

export function handler(request, response) {
  return routes(request, response).catch(handleError(response));
}
