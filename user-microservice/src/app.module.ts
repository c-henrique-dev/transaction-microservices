import { Module } from "@nestjs/common";
import { typeOrmAsyncConfig } from "./infra/nestjs/configs/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./infra/nestjs/modules/user.module";

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), ConfigModule.forRoot({ isGlobal: true }), UserModule],
})
export class AppModule {}
