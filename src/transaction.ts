const decimal = require('bignumber.js'); // TODO use gmp binding (eg. node-gmp)
const assert = require('assert');
const moment = require('moment');
const pad = require('pad');
const _ = require('underscore');

export default class Transaction {
  constructor(metadata) {
    if (!(this instanceof Transaction)) return new Transaction(metadata);
    _.extend(this, metadata);
    this.postings = [];
  }

  transfer(fromAccount, toAccount, amount, metadata) {
    assert(fromAccount instanceof Account);
    assert(toAccount instanceof Account);
    assert(amount.plus);
    this.postings.push(new Posting(fromAccount, amount.neg(), metadata));
    this.postings.push(new Posting(toAccount, amount, metadata));
    return this;
  }

  valid() {
    const sum = this.postings.reduce((sum, posting) => {
      assert(posting instanceof Posting);
      return sum.plus(posting.amount);
    }, decimal('0'));
    return sum.equals(decimal('0'));
  }

  toLedger() {
    assert(this.date instanceof Date);
    assert(this.payee);
    let str = `${moment(this.date).format('YYYY-MM-DD')} ${this.payee}`;
    if (this.note) str += `    ; ${this.note}`;
    this.postings.forEach((posting) => {
      str += `\n    ${posting.toLedger()}`;
    });
    return str;
  }
}
