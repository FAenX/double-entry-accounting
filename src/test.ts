import Posting from './entry';
import Transaction from './transaction';
import moment from 'moment';

const transaction = new Transaction('id', moment.utc().valueOf(), 0, {});
const t = transaction.create(20);

console.log('id');
console.log(t);
