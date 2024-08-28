import { UserRepositoryInterface } from "src/domain/interfaces/user-repository.interface";
import { CryptographyInterface } from "src/domain/interfaces/cryptography.interface";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserAdapter } from "../adapters/user.adapter";
import { AddressAdapter } from "../adapters/address.adapter";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private cryptographyInterface: CryptographyInterface,
  ) {}

  async execute(userInput: CreateUserInput): Promise<CreateUserOutput> {
    const address = AddressAdapter.create(
      userInput.address.street,
      userInput.address.city,
      userInput.address.state,
      userInput.address.postalCode,
      userInput.address.country,
    );

    const userEntity = new UserEntity(
      userInput.email,
      await this.cryptographyInterface.hash(userInput.password),
      userInput.agency,
      userInput.account,
      address,
    );

    const user = UserAdapter.create(
      userEntity.getEmail(),
      userEntity.getPassword(),
      userEntity.getAgency(),
      userEntity.getAccount(),
      address,
    );
    await this.userRepository.insert(user);
    return user.toJSON();
  }
}

type CreateUserInput = {
  email: string;
  password: string;
  agency: string;
  account: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

type CreateUserOutput = {
  email: string;
  password: string;
  agency: string;
  account: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};
