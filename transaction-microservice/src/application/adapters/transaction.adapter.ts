import { TransactionEntity } from "../../domain/entities/transaction.entity";

export class TransactionAdapter {
  static create(senderUserId: string, receivedUserId: string, amount: number, description: string) {
    return new TransactionEntity(senderUserId, receivedUserId, amount, description);
  }
}
