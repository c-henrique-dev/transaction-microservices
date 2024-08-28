import { Module } from "@nestjs/common";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { CreateUserUseCase } from "src/application/user-case/create-user.use-case";
import { BcryptProvider } from "../../providers/bcrypt.provider";
import { UserRepository } from "../../repositories/user.repository";
import { CryptographyInterface } from "src/domain/interfaces/cryptography.interface";
import { UserRepositoryInterface } from "src/domain/interfaces/user-repository.interface";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { SigninUseCase } from "src/application/user-case/signin.use-case";
import { JwtInterface } from "src/domain/interfaces/jwt.interface";
import { JwtModule } from "@nestjs/jwt";
import { JwtProvider } from "../../providers/jwt.provider";
import { UpdateUserUseCase } from "src/application/user-case/update-user.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "30m" },
        global: true,
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    BcryptProvider,
    JwtProvider,
    CreateUserUseCase,
    UpdateUserUseCase,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface, bcypt: CryptographyInterface) => {
        return new CreateUserUseCase(userRepo, bcypt);
      },
      inject: [UserRepository, BcryptProvider],
    },

    {
      provide: UpdateUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface, bcypt: CryptographyInterface) => {
        return new UpdateUserUseCase(userRepo, bcypt);
      },
      inject: [UserRepository, BcryptProvider],
    },

    {
      provide: SigninUseCase,
      useFactory: (userRepo: UserRepositoryInterface, bcypt: CryptographyInterface, jwtInterface: JwtInterface) => {
        return new SigninUseCase(userRepo, bcypt, jwtInterface);
      },
      inject: [UserRepository, BcryptProvider, JwtProvider],
    },
  ],
})
export class UserModule {}
