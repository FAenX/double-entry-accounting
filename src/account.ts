import {Metadata} from './interfaces'

class Account {
  accountName: string;

  metadata?: Metadata;

  constructor(name:string, metadata?:Metadata) {
    this.accountName = name;
    this.metadata = metadata;
  }
}

export default Account;

