import { TransactionEntity } from "../entities/transaction.entity";

export interface TransactionRepositoryInterface {
  insert(TransactionEntity: TransactionEntity): Promise<TransactionEntity>;
  findById(id: string): Promise<TransactionEntity>;
  findBySenderUser(id: string): Promise<TransactionEntity[]>;
}
