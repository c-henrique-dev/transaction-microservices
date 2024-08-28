import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TransactionService } from "../services/transaction.service";
import { TransactionDto } from "../dtos/transaction.dto";
import { AuthGuard } from "../guards/auth.guard";

@Controller("transaction")
@UseGuards(AuthGuard)
export class TransferenceController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async initiateTransaction(@Body() transactionDto: TransactionDto) {
    return this.transactionService.initiateTransaction(transactionDto);
  }

  @Get(":id")
  async getTransferDetail(@Param("id") id: string) {
    return this.transactionService.getTransferDetail(id);
  }

  @Get("user/:id")
  async listUserTransfer(@Param("id") id: string) {
    return this.transactionService.listUserTransfer(id);
  }
}
