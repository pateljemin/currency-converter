import axios from 'axios';
import { FIXER_API } from '../constants';
import { getActualRate } from '../utils/currencyConverterUtil';

/**
 * Make an API call to external service and get the date. It will return rates of symbols with base symbol as EUR.
 */
export const getAllRates = async () => {
    try {
        const response = await axios.get(`${FIXER_API}?access_key=${process.env.FIXER_KEY}`);
        return response.data.rates;
    } catch (error) {
        console.error(`[CurrencyConverterService][getRate] Error in calling FIXER API :${error}`);
        throw error;
    }
};

/**
 * Return the currency conversation.
 * @param from : From Symbol
 * @param to: To Symbol
 */
export const getRate = async (from, to) => {
    return getActualRate(await getAllRates(), from, to);
};
