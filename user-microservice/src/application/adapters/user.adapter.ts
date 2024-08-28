import { AddressEntity } from "src/domain/entities/address.entity";
import { UserEntity } from "src/domain/entities/user.entity";

export class UserAdapter {
  static create(email: string, password: string, agency: string, account: string, address: AddressEntity, id?: string) {
    return new UserEntity(email, password, agency, account, address, id);
  }
}
