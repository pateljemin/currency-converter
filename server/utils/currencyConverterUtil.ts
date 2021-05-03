/**
 * Since we are getting all rates with base EUR symbol.
 *
 * @param rates : Array of rates
 * @param from : symbol
 * @param to : symbol
 */
export const getActualRate = (rates, from, to) => {
    if (from === 'EUR') { // No need to convert as all the rates with respect to EUR.
        return rates[to];
    }
    return ((1 / rates[from]) * rates[to]).toFixed(3);
};

/**
 * Reverse the rate. Ex. if you know USD-HKD you can get HKD-USD
 * @param rate
 */
export const getReverseRate = (rate) => {
    return (1 / rate).toFixed(3);
};
