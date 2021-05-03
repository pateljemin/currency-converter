import { NextFunction, Request, Response } from 'express';
import * as CacheService from '../service/CacheService';
import * as CurrencyConverterService from '../service/CurrencyConverterService';
import { getReverseRate } from '../utils/currencyConverterUtil';

/**
 * REST Controller to serve the currency converter request.
 *
 * It will validate the input symnbols. If not valid then will return with 400 error.
 *
 * First it will look into cache. If it is available then it will be return from cache result.
 *
 * If it is not available from cache then it will expect rate from service.
 *
 * If something goes wrong then it will return 500 error.
 *
 * @param req will have symbols as a param.Ex. USD-HKD
 * @param res will carry rate : Either from cache or from API call.
 * @param next
 */
export const getCurrencyRate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const symbols = req.params.symbols;
    try {
        let rate = CacheService.getValue(symbols);
        if (!rate) {
            const currencies = symbols.split('-');
            if (currencies.length < 2) {
                return res.status(400).json({ message: 'Provide valid symbols' });
            }
            rate = await CurrencyConverterService.getRate(currencies[0], currencies[1]);
            CacheService.setValue(symbols, rate);
            CacheService.setValue(`${currencies[1]}-${currencies[0]}`, getReverseRate(rate));
            return res.json({ symbols, rate });
        }
        return res.json({ symbols, rate });
    } catch (err) {
        console.error(`[CurrencyControllers][getCurrencyRate] Error :${err}`);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
};
