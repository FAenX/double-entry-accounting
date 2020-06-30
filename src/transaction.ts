import moment from 'moment';
import Account from './account';
import Posting from './posting';

export default class Transaction {
    date: string = moment().format()

    note: string

    payee: string

    postings: Posting[]

    constructor(payee: string, note: string) {
      this.postings = [];
      this.payee = payee;
      this.note = note;
    }

    private isValid() {
      const sum = this.postings.reduce((sum, posting) => sum + posting.amount, 0);
      return sum === 0;
    }

    transfer(fromAccount: Account, toAccount: Account, amount: number, metadata?:any) {
      this.postings.push(
        new Posting(
          fromAccount,
          -Math.abs(amount),
          this.payee,
          this.note,
          metadata,
        ),
      );
      this.postings.push(
        new Posting(
          toAccount,
          amount,
          this.payee,
          this.note,
          metadata,
        ),
      );
      if (this.isValid()) {
        return this;
      }
      return 'Balance error';
    }
}
