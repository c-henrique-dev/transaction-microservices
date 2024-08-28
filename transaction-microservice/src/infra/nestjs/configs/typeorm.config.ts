import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const typeOrmAsyncConfig = <TypeOrmModuleAsyncOptions>{
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: "postgres",
    host: configService.get<string>(`POSTGRES_HOST`),
    port: Number(configService.get<number>(`POSTGRES_PORT`)),
    username: configService.get<string>(`POSTGRES_USER`),
    database: configService.get<string>(`POSTGRES_DATABASE`),
    password: configService.get<string>(`POSTGRES_PASSWORD`),
    entities: ["dist/**/*.entity.js"],
    synchronize: Boolean(configService.get<boolean>(`POSTGRES_SYNCHRONIZE`)),
    logging: Boolean(configService.get<boolean>(`POSTGRES_LOGGING`)),
  }),
  inject: [ConfigService],
};
