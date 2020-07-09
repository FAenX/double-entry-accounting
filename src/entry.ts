export default class Entry {
    amount: number;

    date: number

    note: string
    carryFoward: number = 0

    constructor(
      date: number,
      amount: number,
      note: string,
    ) {
      this.amount = amount;
      this.note = note;
      this.date = date;
    }
}
