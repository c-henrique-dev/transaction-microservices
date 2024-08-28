import { NotFoundException } from "src/domain/exceptions/api.error";
import { RabbitMQClientInterface } from "src/domain/interfaces/rabbitmq.interface";
import { TransactionRepositoryInterface } from "src/domain/interfaces/transaction.repository";

export class ListUserTransfersUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
    private readonly rabbitMQClient: RabbitMQClientInterface,
  ) {}

  async execute(id: string) {
    const transactions = await this.transactionRepository.findBySenderUser(id);

    if (transactions.length == 0) {
      throw new NotFoundException("Transaction not found");
    }

    const senderUsers = [];
    const receiverUsers = [];

    for (const transaction of transactions) {
      const senderUser = await this.rabbitMQClient.sendMessage({ cmd: "get_user" }, transaction.senderUserId);
      const receiverUser = await this.rabbitMQClient.sendMessage({ cmd: "get_user" }, transaction.receiverUserId);

      senderUsers.push(senderUser);
      receiverUsers.push(receiverUser);
    }

    const result = transactions.map((transaction, index) => ({
      ...transaction.toJSON(),
      senderUser: senderUsers[index],
      receiverUser: receiverUsers[index],
    }));

    return result;
  }
}
