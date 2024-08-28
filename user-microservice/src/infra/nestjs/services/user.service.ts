import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/user-case/create-user.use-case";
import { UserDto } from "../dtos/user.dto";
import { SigninUseCase } from "src/application/user-case/signin.use-case";
import { UserRepository } from "../../repositories/user.repository";
import { RpcException } from "@nestjs/microservices";
import { UpdateUserUseCase } from "src/application/user-case/update-user.use-case";
import { UserAdapter } from "src/application/adapters/user.adapter";
import { AddressAdapter } from "src/application/adapters/address.adapter";

@Injectable()
export class UserService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private signinUseCase: SigninUseCase,
    private userRepository: UserRepository,
  ) {}

  createUser(userDto: UserDto) {
    const address = AddressAdapter.create(
      userDto.address.street,
      userDto.address.city,
      userDto.address.state,
      userDto.address.postalCode,
      userDto.address.country,
    );
    const user = UserAdapter.create(userDto.email, userDto.password, userDto.account, userDto.agency, address);
    return this.createUserUseCase.execute(user.toJSON());
  }

  updateUser(id: string, userDto: UserDto) {
    const address = AddressAdapter.create(
      userDto.address.street,
      userDto.address.city,
      userDto.address.state,
      userDto.address.postalCode,
      userDto.address.country,
    );
    const user = UserAdapter.create(userDto.email, userDto.password, userDto.agency, userDto.account, address);
    return this.updateUserUseCase.execute(id, user.toJSON());
  }

  signin(userDto: UserDto) {
    return this.signinUseCase.execute(userDto);
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new RpcException({ message: "User not found", statusCode: 404 });
    }

    return user;
  }
}
