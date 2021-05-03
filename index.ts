/**
 * Bootstrap your app
 * @author Jemin Patel <pateljeminb@gmail.com>
 */

import config from './config';
import Express from './config/express';

/**
 * Initialize Express
 */
export const ExpressServer = new Express();
ExpressServer.init();
process.on('SIGTERM', ExpressServer.shutDown);
process.on('SIGINT', ExpressServer.shutDown);

/**
 * Listen to port
 */
ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
    ExpressServer.initCache(process.env.INTERVAL);
    console.log(`🚀  Server ready at ${config.port}`);
    console.log(
        `🚀  Server GraphQL ready at http://localhost:${config.port}${ExpressServer.server.graphqlPath}`
    );
    console.log(
        `🚀  Server REST API ready at http://localhost:${config.port}/api/v1/`
    );
});
