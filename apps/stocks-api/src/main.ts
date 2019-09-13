/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import * as Wreck from '@hapi/wreck';
import { Request, ResponseToolkit, Server } from 'hapi';
import { environment } from './environments/environment';

const cache: { [url: string]: any } = {};

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{range}',
    handler: async (request: Request, h: ResponseToolkit) => {
      const { symbol, range } = request.params;
      const { token } = request.query;

      const url = `${
        environment.stocksApiURL
      }/beta/stock/${symbol}/chart/${range}?token=${token}`;

      if (cache[url]) {
        return cache[url];
      }

      const { payload } = await Wreck.get(url);

      cache[url] = payload;

      return payload;
    },
    options: {
      cors: true
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
