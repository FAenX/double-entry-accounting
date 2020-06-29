import pad from 'pad';
import Account from './account';

export default class Posting {
    private account: Account;

    private amount: number;

    private metadata: string

    constructor(account: Account, amount: number, metadata: string) {
      this.metadata = metadata;
      this.account = account;
      this.amount = amount;
    }

    toLedger() {
      assert(this.account.name.match(/^([\w:.@-]( (?!$))?)+$/));
      let str = `${pad(this.account.name, 40)}  ${pad(10, this.amount.toFixed())}`;
      if (this.note) str += `  ; ${this.note}`;
      return str;
    }
}
