class BalanceMap {
    constructor() {
      this.balances = new Map();
      // HACK nodejs 0.11.13 does not support Map iteration, so we keep track of
      // keys in an array
      this.accounts = [];
    }
  
    get(account) {
      if (this.balances.has(account)) return this.balances.get(account);
      assert(account instanceof Account);
      return decimal(0);
    }
  
    has(account) {
      return this.balances.has(account);
    }
  
    set(account, value) {
      if (!this.balances.has(account)) this.accounts.push(account);
      this.balances.set(account, value);
    }
  
    addPosting(posting) {
      assert(posting instanceof Posting);
      this.set(posting.account, this.get(posting.account).plus(posting.amount));
    }
  
    addTransaction(transaction) {
      assert(transaction instanceof Transaction);
      const self = this;
      transaction.postings.forEach((posting) => {
        self.addPosting(posting);
      });
    }
  
    toJSON() {
      const self = this;
      const json = {};
      this.accounts.forEach((account) => {
        json[account.name] = self.balances.get(account).toString();
      });
      return json;
    }
}

static fromJSON(json, account_lookup) {
    const map = new BalanceMap();
    _.forEach(json, (balance, account_name) => {
      const account = account_lookup(account_name);
      map.set(account, decimal(balance));
    });
    return map;
  }
}