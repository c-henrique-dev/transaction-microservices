import { AddressEntity } from "src/domain/entities/address.entity";

export class AddressAdapter {
  static create(street: string, city: string, state: string, postalCode: string, country: string, id?: string) {
    return new AddressEntity(street, city, state, postalCode, country, id);
  }
}
