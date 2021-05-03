import expressPromiseRouter from 'express-promise-router';
import { getCurrencyRate } from '../controllers/CurrencyController';

export const router = expressPromiseRouter();

router.route('/currency-rate/:symbols').get(getCurrencyRate);
