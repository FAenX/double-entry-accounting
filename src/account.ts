import {Metadata} from './interfaces'

class Account {
  accountName: string;

  metadata: any;

  constructor(name:string, metadata?:any) {
    this.accountName = name;
    this.metadata = metadata;
  }
}

export default Account;

