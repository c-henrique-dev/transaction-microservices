import { Module } from "@nestjs/common";
import { TransactionRepository } from "../../repositories/transaction.repository";
import { RabbitMQClientProvider } from "../../providers/rabbitmq.provider";
import { TransactionRepositoryInterface } from "src/domain/interfaces/transaction.repository";
import { TransferenceController } from "../controllers/transaction.controller";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../entities/transaction.entity";
import { DataSource } from "typeorm";
import { RabbitMQClientInterface } from "src/domain/interfaces/rabbitmq.interface";
import { InitiateTransactionUseCase } from "src/application/use-cases/initiate-transaction.use-case";
import { GetTransferDetailsUseCase } from "src/application/use-cases/get-transfer-detail.use-case";
import { ListUserTransfersUseCase } from "src/application/use-cases/list-user-transfer.use-case";
import { TransactionService } from "../services/transaction.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransferenceController],
  providers: [
    GetTransferDetailsUseCase,
    InitiateTransactionUseCase,
    RabbitMQClientProvider,
    TransactionService,
    JwtService,
    {
      provide: TransactionRepository,
      useFactory: (dataSource: DataSource) => {
        return new TransactionRepository(dataSource.getRepository(Transaction));
      },
      inject: [getDataSourceToken()],
    },

    {
      provide: InitiateTransactionUseCase,
      useFactory: (transferRepo: TransactionRepositoryInterface, rabbitmq: RabbitMQClientInterface) => {
        return new InitiateTransactionUseCase(transferRepo, rabbitmq);
      },
      inject: [TransactionRepository, RabbitMQClientProvider],
    },

    {
      provide: GetTransferDetailsUseCase,
      useFactory: (transferRepo: TransactionRepositoryInterface, rabbitmq: RabbitMQClientInterface) => {
        return new GetTransferDetailsUseCase(transferRepo, rabbitmq);
      },
      inject: [TransactionRepository, RabbitMQClientProvider],
    },

    {
      provide: ListUserTransfersUseCase,
      useFactory: (transferRepo: TransactionRepositoryInterface, rabbitmq: RabbitMQClientInterface) => {
        return new ListUserTransfersUseCase(transferRepo, rabbitmq);
      },
      inject: [TransactionRepository, RabbitMQClientProvider],
    },
  ],
})
export class TransactionModule {}
