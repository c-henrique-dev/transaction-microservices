import { BadRequestException } from "../exceptions/api.error";
import { AddressEntity } from "./address.entity";

export class UserEntity {
  private id: string;
  private email: string;
  private password: string;
  private agency: string;
  private account: string;
  private address: AddressEntity;

  constructor(
    email: string,
    password: string,
    agency: string,
    account: string,
    addressModel: AddressEntity,
    id?: string,
  ) {
    this.email = email;
    this.password = password;
    this.agency = agency;
    this.account = account;
    this.address = addressModel;
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new BadRequestException("Invalid email format.");
    }

    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string) {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }
    this.password = password;
  }

  getAgency() {
    return this.agency;
  }

  setAgency(agency: string) {
    this.agency = agency;
  }

  getAccount() {
    return this.account;
  }

  setAccount(account: string) {
    this.account = account;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address: AddressEntity) {
    this.address = address;
  }

  update(user: UserEntity) {
    this.setAccount(user.account);
    this.setAgency(user.agency);
    this.setEmail(user.email);
    this.setPassword(user.password);
    this.getAddress().setCity(user.address.getCity());
    this.getAddress().setCountry(user.address.getCountry());
    this.getAddress().setPostalCode(user.address.getPostalCode());
    this.getAddress().setState(user.address.getState());
    this.getAddress().setStreet(user.address.getStreet());
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      agency: this.agency,
      account: this.account,
      address: this.address.toJSON(),
    };
  }
}
