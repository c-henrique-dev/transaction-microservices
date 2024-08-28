import { UserRepositoryInterface } from "src/domain/interfaces/user-repository.interface";
import { CryptographyInterface } from "src/domain/interfaces/cryptography.interface";
import { UserAdapter } from "../adapters/user.adapter";
import { AddressAdapter } from "../adapters/address.adapter";

export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private cryptographyInterface: CryptographyInterface,
  ) {}

  async execute(id: string, userInput: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findById(id);
    const addressMapper = AddressAdapter.create(
      userInput.address.city,
      userInput.address.country,
      userInput.address.postalCode,
      userInput.address.state,
      userInput.address.street,
    );

    const userMapper = UserAdapter.create(
      userInput.email,
      await this.cryptographyInterface.hash(userInput.password),
      userInput.agency,
      userInput.account,
      addressMapper,
    );

    user.update(userMapper);
    await this.userRepository.update(id, user);
    return user.toJSON();
  }
}

type UpdateUserInput = {
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

type UpdateUserOutput = {
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
