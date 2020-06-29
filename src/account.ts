export default class Account {
    public name: string;

    private metadata: string;

    constructor(name: string, metadata: string) {
      this.name = name;
      this.metadata = metadata;
    }
}
