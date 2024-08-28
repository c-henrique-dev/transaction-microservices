import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "src/domain/entities/transaction.entity";
import { Transaction } from "../nestjs/entities/transaction.entity";
import { TransactionAdapter } from "src/application/adapters/transaction.adapter";
import { TransactionRepositoryInterface } from "src/domain/interfaces/transaction.repository";

export class TransactionRepository implements TransactionRepositoryInterface {
  constructor(
    @InjectRepository(Transaction)
    private transferenceRepository: Repository<Transaction>,
  ) {}

  async findBySenderUser(id: string): Promise<TransactionEntity[]> {
    const users = await this.transferenceRepository.find({ where: { senderUserId: id } });
    const transactions: TransactionEntity[] = [];

    for (const user of users) {
      const transaction = TransactionAdapter.create(
        user.senderUserId,
        user.receiverUserId,
        user.amount,
        user.description,
      );
      transactions.push(transaction);
    }

    return transactions;
  }

  async findById(id: string): Promise<TransactionEntity> {
    const user = await this.transferenceRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      return null;
    }

    return TransactionAdapter.create(user.senderUserId, user.receiverUserId, user.amount, user.description);
  }

  async insert(transferenceModel: TransactionEntity): Promise<TransactionEntity> {
    const transference = await this.transferenceRepository.save(transferenceModel);
    return TransactionAdapter.create(
      transference.senderUserId,
      transference.receiverUserId,
      transference.amount,
      transference.description,
    );
  }
}
