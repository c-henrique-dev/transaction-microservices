import { TransactionRepositoryInterface } from "src/domain/interfaces/transaction.repository";
import { RabbitMQClientInterface } from "../../domain/interfaces/rabbitmq.interface";
import { NotFoundException } from "src/domain/exceptions/api.error";

export class GetTransferDetailsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
    private readonly rabbitMQClient: RabbitMQClientInterface,
  ) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    const senderUser = await this.rabbitMQClient.sendMessage({ cmd: "get_user" }, transaction.senderUserId);
    const receiverUser = await this.rabbitMQClient.sendMessage({ cmd: "get_user" }, transaction.receiverUserId);

    return {
      ...transaction.toJSON(),
      senderUser,
      receiverUser,
    };
  }
}
