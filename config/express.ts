/**
 * File containing Express Configuration
 * @author Jemin Patel <pateljeminb@gmail.com>
 */

import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import * as http from 'http';
import schema from '../server/graphql/schema/index';
import { router } from '../server/router/router';
import { populateDefaultCurrencyRate } from '../server/service/CacheService';
import config from './index';

class Express {
    public express: express.Application;
    public server: ApolloServer = new ApolloServer(schema);
    public httpServer: http.Server;
    public interval;
    public init = (): void => {
        /**
         * Creating an express application
         */
        this.express = express();
        /**
         * Middlerware for using CORS
         */
        this.express.use(cors({
            origin(origin, callback) {
                /**
                 * Allow requests with no origin
                 * Like mobile apps or curl requests
                 */
                if (!origin) {
                    return callback(null, true);
                }
                if (config.allowedOrigins.indexOf(origin) === -1) {
                    const msg = `The CORS policy for this site does not
          allow access from the specified Origin.`;
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        }));
        this.express.use('/api/v1', router);
        /**
         *  Middlerware for extracting authToken
         */
        this.server.applyMiddleware({ app: this.express });
        this.httpServer = http.createServer(this.express);
        /**
         * Installing subscription handlers
         */
        this.server.installSubscriptionHandlers(this.httpServer);
    };

    /**
     * Should be called upon server start up
     *
     * @param interval : Milliseconds after which cache will be refreshed
     */
    public initCache = (interval): void => {
        populateDefaultCurrencyRate();
        this.interval = setInterval(populateDefaultCurrencyRate, interval);
    };

    /**
     * Should be called on server shutdown
     */
    public shutDown = (): void => {
        clearInterval(this.interval);
    }
}

export default Express;
