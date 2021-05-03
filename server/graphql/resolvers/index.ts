/**
 * Exporting all resolvers
 * @author Jemin Patel <pateljeminb@gmail.com>
 */

import { CurrencyConverter } from './CurrencyConverter';

const rootResolver = {
    Query: {
        ...CurrencyConverter
        // Add other queries here
    }
};

export default rootResolver;
