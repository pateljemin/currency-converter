/**
 * File containing all queries, mutations and subscriptions
 * @author Jemin Patel <pateljeminb@gmail.com>
 */

import * as CacheService from '../../service/CacheService';
import * as CurrencyConverterService from '../../service/CurrencyConverterService';
import { getReverseRate } from '../../utils/currencyConverterUtil';

/**
 * Currency Queries:
 *
 * It will validate the input symnbols. If not valid then will return with 400 error.
 *
 * First it will look into cache. If it is available then it will be return from cache result.
 *
 * If it is not available from cache then it will expect rate from service.
 *
 * If something goes wrong then it will return 500 error.
 */
const CurrencyConverter = {
    currencyRate: async (parent, args, context) => {
        try {
            const symbols = args.symbols;
            let rate = CacheService.getValue(symbols);
            if (!rate) {
                const currencies = symbols.split('-');
                if (currencies.length < 2) {
                        throw new Error('Provide valid symbols');
                }
                rate = await CurrencyConverterService.getRate(currencies[0], currencies[1]);
                CacheService.setValue(symbols, rate);
                CacheService.setValue(`${currencies[1]}-${currencies[0]}`, getReverseRate(rate));
                return {symbols, rate};
            }
            return {symbols, rate};
        } catch (err) {
            console.error(`[CurrencyConverterResolver][currencyRate] Error :${err}`);
            throw err;
        }
    }
};

export { CurrencyConverter };
