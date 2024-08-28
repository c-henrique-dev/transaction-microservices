import { AddressEntity } from "src/domain/entities/address.entity";
import { Address } from "../nestjs/entities/address.entity";
import { User } from "../nestjs/entities/user.entity";

export class UserEntityMapper {
  static create(
    email: string,
    password: string,
    agency: string,
    account: string,
    addressModel: AddressEntity,
    id?: string,
  ) {
    const address = this.createAddress(addressModel);

    const user = new User();
    user.email = email;
    user.password = password;
    user.agency = agency;
    user.account = account;
    user.address = address;
    user.id = id;
    return user;
  }

  static createAddress(addressEntity: AddressEntity) {
    const address = new Address();
    address.city = addressEntity.getCity();
    address.country = addressEntity.getCountry();
    address.postalCode = addressEntity.getPostalCode();
    address.state = addressEntity.getState();
    address.street = addressEntity.getStreet();

    return address;
  }
}
