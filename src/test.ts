import Account from './account';
import Posting from './posting';
import Transaction from './transaction'

const account1 = new Account('emmanuel');
const account2 = new Account('emmanuel');
// const posting = new Posting(account1, 20);
const transaction = new Transaction(account1.accountName, "payment reason")



let t = transaction.transfer(account1, account2, 20)

console.log(account1);
console.log(t);


