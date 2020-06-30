import assert from 'assert';
import Account from './account';
import {Metadata} from './interfaces'
import moment from 'moment'

export default class Posting {
    account: Account;
    payee: string;
    amount: number;
    date: string = `${moment().format('YYYY-MM-DD')}`
    metadata?: Metadata
    note: string = 'This is my note'

    constructor(
      account: Account, 
      amount: number, 
      payee: string,
      note: string,
      metadata?: Metadata, 
      ) {
      this.metadata = metadata;
      this.account = account;
      this.amount = amount;
      this.payee = payee;
      this.note = note
    }
}
