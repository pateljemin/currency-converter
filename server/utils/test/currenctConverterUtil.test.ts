import * as Util from '../currencyConverterUtil';

describe('Currency Util Test Suit', () => {
    it('Actual Rate', () => {
        expect(Util.getActualRate({
            HKD: 100,
            INR: 100,
            USD: 80
        }, 'INR', 'USD')).toEqual('0.800');
        expect(Util.getActualRate({
            HKD: 100,
            INR: 90,
            USD: 80
        }, 'EUR', 'INR')).toEqual(90);
    });

    it('Reverse rate', () => {
        expect(Util.getReverseRate(5)).toEqual('0.200');
    });
});
