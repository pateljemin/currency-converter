/**
 * Config file
 * @author Jemin Patel <pateljeminb@gmail.com>
 */

import dotenv from 'dotenv';
dotenv.config();
export default {
    port: process.env.PORT,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:4020']
};
