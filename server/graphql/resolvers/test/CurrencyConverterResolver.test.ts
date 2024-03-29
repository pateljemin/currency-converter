import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';
import { ExpressServer } from '../../../../index';
import { FIXER_API } from '../../../constants';
import * as CacheService from '../../../service/CacheService';

describe('Currency Controller Test Suit', () => {
    beforeAll(async () => {
        const data = {
            rates: {
                AED: 4.415053,
                AFN: 93.64,
                ALL: 123.45,
                AMD: 628.909998,
                ANG: 2.1684,
                AOA: 786.502638,
                ARS: 112.9415,
                AUD: 1.557594,
                AWG: 2.164192,
                AZN: 2.048163,
                BAM: 1.95583,
                BBD: 2.4391,
                BDT: 102.3715,
                BGN: 1.953872,
                BHD: 0.4532,
                BIF: 2355.289993,
                BMD: 1.201995,
                BND: 1.6045,
                BOB: 8.3412,
                BRL: 6.537129,
                BSD: 1.208,
                BTC: 2.1221318e-5,
                BTN: 89.4877,
                BWP: 13.1233,
                BYN: 3.0927,
                BYR: 23559.101929,
                BZD: 2.435,
                CAD: 1.477072,
                CDF: 2405.192423,
                CHF: 1.097472,
                CLF: 0.030959,
                CLP: 854.262546,
                CNY: 7.782322,
                COP: 4487.799987,
                CRC: 746.209998,
                CUC: 1.201995,
                CUP: 31.852867,
                CVE: 110.265,
                CZK: 25.860447,
                DJF: 215.049999,
                DKK: 7.435866,
                DOP: 68.626,
                DZD: 160.236799,
                EGP: 18.823,
                ERN: 18.032222,
                ETB: 50.6652,
                EUR: 1,
                FJD: 2.437706,
                FKP: 0.873099,
                GBP: 0.869971,
                GEL: 4.159372,
                GGP: 0.873099,
                GHS: 6.9701,
                GIP: 0.873099,
                GMD: 61.482513,
                GNF: 11965.799964,
                GTQ: 9.3227,
                GYD: 252.729999,
                HKD: 9.336261,
                HNL: 29.018,
                HRK: 7.547375,
                HTG: 103.163,
                HUF: 360.166247,
                IDR: 17360.053134,
                ILS: 3.898239,
                IMP: 0.873099,
                INR: 89.062425,
                IQD: 1762.459995,
                IRR: 50609.999747,
                ISK: 150.622457,
                JEP: 0.873099,
                JMD: 185.348999,
                JOD: 0.85258,
                JPY: 131.378659,
                KES: 130.2219,
                KGS: 101.926296,
                KHR: 4889.999985,
                KMF: 492.037113,
                KPW: 1081.795728,
                KRW: 1343.542388,
                KWD: 0.361981,
                KYD: 1.0067,
                KZT: 519.559998,
                LAK: 11362.399966,
                LBP: 1826.499995,
                LKR: 238.578999,
                LRD: 206.803698,
                LSL: 17.393326,
                LTL: 3.549179,
                LVL: 0.727075,
                LYD: 5.4019,
                MAD: 10.7781,
                MDL: 21.3936,
                MGA: 4599.479986,
                MKD: 61.51,
                MMK: 1881.452394,
                MNT: 3426.469902,
                MOP: 9.6612,
                MRO: 429.112007,
                MUR: 48.44,
                MVR: 18.535218,
                MWK: 952.443997,
                MXN: 24.327478,
                MYR: 4.922775,
                MZN: 69.211326,
                NAD: 17.213022,
                NGN: 457.363576,
                NIO: 42.189,
                NOK: 10.023244,
                NPR: 143.18,
                NZD: 1.678178,
                OMR: 0.46275,
                PAB: 1.208,
                PEN: 4.5735,
                PGK: 4.2959,
                PHP: 57.984,
                PKR: 185.004399,
                PLN: 4.556703,
                PYG: 7883.399976,
                QAR: 4.37651,
                RON: 4.92554,
                RSD: 117.6,
                RUB: 90.499891,
                RWF: 1209.089996,
                SAR: 4.508107,
                SBD: 9.566254,
                SCR: 17.8,
                SDG: 466.374467,
                SEK: 10.168884,
                SGD: 1.5997,
                SHP: 0.873099,
                SLL: 12302.419195,
                SOS: 701.965485,
                SRD: 17.013083,
                STD: 24916.320193,
                SVC: 10.57,
                SYP: 1511.589733,
                SZL: 17.4175,
                THB: 37.430568,
                TJS: 13.7772,
                TMT: 4.219002,
                TND: 3.303128,
                TOP: 2.717355,
                TRY: 9.96262,
                TTD: 8.2057,
                TWD: 33.489388,
                TZS: 2801.339992,
                UAH: 33.5337,
                UGX: 4320.999987,
                USD: 1.201995,
                UYU: 53.128,
                UZS: 12711.729962,
                VEF: 257022857326.61368,
                VND: 27849.999916,
                VUV: 131.665165,
                WST: 3.043123,
                XAF: 655.956998,
                XAG: 0.046431,
                XAU: 0.000679,
                XCD: 3.248452,
                XDR: 0.8403,
                XOF: 655.956998,
                XPF: 119.53884,
                YER: 301.009642,
                ZAR: 17.423162,
                ZMK: 10819.40168,
                ZMW: 26.9896,
                ZWL: 387.042623
            }
        };
        const mock = new MockAdapter(axios);
        mock.onGet(`${FIXER_API}?access_key=${process.env.FIXER_KEY}`).reply(200, data);
        await CacheService.populateDefaultCurrencyRate();
    });
    afterAll(() => {
        ExpressServer.shutDown();
    });

    it('Get Currency Rate', async () => {
        const { body } = await request(ExpressServer.express).post('/graphql').send({
            query: '{currencyRate(symbols: "EUR-HKD") { rate, symbols } }'
        }).set('Accept', 'application/json');
        expect(body.data.currencyRate.rate).toEqual(9.336261);
        expect(body.data.currencyRate.symbols).toEqual(`EUR-HKD`);
    });

    it('Get Currency Rate from cache', async () => {
        const { body } = await request(ExpressServer.express).post('/graphql').send({
            query: '{currencyRate(symbols: "USD-HKD") { rate, symbols } }'
        }).set('Accept', 'application/json');
        expect(body.data.currencyRate.rate).toEqual(7.767);
        expect(body.data.currencyRate.symbols).toEqual(`USD-HKD`);
    });

    it('Wrong Input', async () => {
        const { body } = await request(ExpressServer.express).post('/graphql').send({
            query: '{currencyRate(symbols: "USD") { rate, symbols } }'
        }).set('Accept', 'application/json');
        expect(body.errors[0].message).toEqual('Provide valid symbols');
    });

    it('API Error', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet(`${FIXER_API}?access_key=${process.env.FIXER_KEY}`).networkError();
        const { body } = await request(ExpressServer.express).post('/graphql').send({
            query: '{currencyRate(symbols: "EUR-INR") { rate, symbols } }'
        }).set('Accept', 'application/json');
        expect(body.errors[0].message).toEqual('Network Error');
    });
});
