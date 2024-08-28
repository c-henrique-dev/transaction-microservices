import { Injectable } from "@nestjs/common";
import { TransactionDto } from "../dtos/transaction.dto";
import { GetTransferDetailsUseCase } from "src/application/use-cases/get-transfer-detail.use-case";
import { ListUserTransfersUseCase } from "src/application/use-cases/list-user-transfer.use-case";
import { InitiateTransactionUseCase } from "src/application/use-cases/initiate-transaction.use-case";

@Injectable()
export class TransactionService {
  constructor(
    private readonly initiateTransactionUseCase: InitiateTransactionUseCase,
    private readonly getTransferDetailUseCase: GetTransferDetailsUseCase,
    private readonly listUserTransferUseCase: ListUserTransfersUseCase,
  ) {}

  async initiateTransaction(transactionDto: TransactionDto) {
    return await this.initiateTransactionUseCase.execute(transactionDto);
  }

  async getTransferDetail(id: string) {
    return await this.getTransferDetailUseCase.execute(id);
  }

  async listUserTransfer(id: string) {
    return await this.listUserTransferUseCase.execute(id);
  }
}
