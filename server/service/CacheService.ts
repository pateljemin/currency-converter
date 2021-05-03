import { getActualRate, getReverseRate } from '../utils/currencyConverterUtil';
import * as CurrencyConverter from './CurrencyConverterService';

/**
 * We can also get these values from DB so it is configurable and whenever we need to add new currency symbol / remove
 * currency symbol without code change we can simply update in DB and just restart the service.
 */
const DEFAULT_CACHE_SYMBOLS = ['USD-SGD', 'USD-HKD'];

let CACHE = new Map();

export const getValue = (key) => {
    return CACHE.get(key);
};

export const setValue = (key, value) => {
    CACHE.set(key, value);
    return true;
};

/**
 * It will populate the CACHE with rate of given default symbols.
 */
export const populateDefaultCurrencyRate = async () => {
    CACHE = new Map();
    const rates = await CurrencyConverter.getAllRates();
    DEFAULT_CACHE_SYMBOLS.forEach(async (symbols) => {
        const currencies = symbols.split('-');
        const rate = getActualRate(rates, currencies[0], currencies[1]);
        setValue(symbols, rate);
        setValue(`${currencies[1]}-${currencies[0]}`, getReverseRate(rate));
    });
};
