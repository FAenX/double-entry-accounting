import moment from 'moment';
import Entry from './entry';

export default class Transaction {
    date: number
    credit: Entry
    debit: Entry
    accountName: string
    metadata: any
    balance: number

    constructor(
      accountName: string,
      TransactionDate: number,
      balance: number,
      metadata: any,
    ) {
      this.accountName = accountName;
      this.date = TransactionDate;
      this.metadata = metadata;
      this.balance = balance;
    }

    private isValid(entries: Entry[]) {
      // difference between paid and balance
      const diff = this.balance - entries[1].amount;

      // if the difference is negative,
      // the user has paid more than they owe
      // to balance, add the diff to the credit as b/cf
      if (diff < 0) {
        // new balance
        this.balance = diff;
        entries[0].carryFoward = diff;
      }

      // if the difference is positive,
      // the user has paid less than they owe
      // to balance, add the diff to the debit as b/cf
      if (diff > 0) {
        // new balance
        this.balance = diff;
        entries[1].carryFoward = diff;
      }

      // both entries should total to zero
      const sum = entries.reduce((sum, entry) =>
        sum + (entry.amount + entry.carryFoward), 0);
      return sum === 0;
    }

    async create(amount: number) {
      try {
        // contain entries
        const entries: Entry[] = [];
        // credit
        entries.push(new Entry(this.date, this.balance, 'credit'));
        // debit
        entries.push(new Entry(this.date, amount, 'debit'));

        // validate transaction
        this.isValid(entries);

        this.credit = entries[0];
        this.debit = entries[1];

        return this;
      } catch (e) {
        // const ent = this.isValid(entries);
        throw new Error;
      }
    }
}
