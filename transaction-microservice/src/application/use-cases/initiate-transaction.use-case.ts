import { TransactionRepositoryInterface } from "src/domain/interfaces/transaction.repository";
import { RabbitMQClientInterface } from "../../domain/interfaces/rabbitmq.interface";
import { TransactionEntity } from "src/domain/entities/transaction.entity";

export class InitiateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
    private readonly rabbitMQClient: RabbitMQClientInterface,
  ) {}

  async execute(createTransactionInput: CreateTransactionInput): Promise<CreateTransactionOutput> {
    await this.rabbitMQClient.sendMessage({ cmd: "get_user" }, createTransactionInput.senderUserId);
    await this.rabbitMQClient.sendMessage({ cmd: "get_user" }, createTransactionInput.receiverUserId);

    const tranferenceModel = new TransactionEntity(
      createTransactionInput.senderUserId,
      createTransactionInput.receiverUserId,
      createTransactionInput.amount,
      createTransactionInput.description,
    );

    await this.transactionRepository.insert(tranferenceModel);

    return tranferenceModel.toJSON();
  }
}

type CreateTransactionInput = {
  senderUserId: string;
  receiverUserId: string;
  amount: number;
  description: string;
};

type CreateTransactionOutput = {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
