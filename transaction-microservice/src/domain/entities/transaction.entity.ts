export class TransactionEntity {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(senderUserId: string, receivedUserId: string, amount: number, description: string) {
    this.senderUserId = senderUserId;
    this.receiverUserId = receivedUserId;
    this.amount = amount;
    this.description = description;
  }

  toJSON() {
    return {
      id: this.id,
      senderUserId: this.senderUserId,
      receiverUserId: this.receiverUserId,
      amount: this.amount,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
