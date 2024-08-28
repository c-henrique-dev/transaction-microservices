import { Module } from "@nestjs/common";
import { typeOrmAsyncConfig } from "./infra/nestjs/configs/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { TransactionModule } from "./infra/nestjs/modules/transaction.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    TransactionModule,
  ],
  providers: [TransactionModule],
})
export class AppModule {}
