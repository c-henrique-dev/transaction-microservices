import { Repository } from "typeorm";
import { UserRepositoryInterface } from "src/domain/interfaces/user-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../nestjs/entities/user.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserAdapter } from "src/application/adapters/user.adapter";
import { AddressAdapter } from "src/application/adapters/address.adapter";
import { UserEntityMapper } from "../mappers/user-entity.mapper";

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id }, relations: { address: true } });
    if (!user) {
      return null;
    }

    const address = AddressAdapter.create(
      user.address.city,
      user.address.country,
      user.address.postalCode,
      user.address.state,
      user.address.street,
      user.address.id,
    );

    return UserAdapter.create(user.email, user.password, user.account, user.agency, address, user.id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      return null;
    }

    const address = AddressAdapter.create(
      user.address.city,
      user.address.country,
      user.address.postalCode,
      user.address.state,
      user.address.street,
    );

    return UserAdapter.create(user.email, user.password, user.account, user.agency, address);
  }

  async insert(userEntity: UserEntity): Promise<UserEntity> {
    const user = UserEntityMapper.create(
      userEntity.getEmail(),
      userEntity.getPassword(),
      userEntity.getAgency(),
      userEntity.getAccount(),
      userEntity.getAddress(),
      userEntity.getId(),
    );
    await this.userRepository.save(user);
    return UserAdapter.create(
      userEntity.getEmail(),
      userEntity.getPassword(),
      userEntity.getAccount(),
      userEntity.getAgency(),
      userEntity.getAddress(),
    );
  }

  async update(id: string, userEntity: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    Object.assign(user, userEntity);
    await this.userRepository.save(user);
    return UserAdapter.create(
      userEntity.getEmail(),
      userEntity.getPassword(),
      userEntity.getAccount(),
      userEntity.getAgency(),
      userEntity.getAddress(),
    );
  }
}
