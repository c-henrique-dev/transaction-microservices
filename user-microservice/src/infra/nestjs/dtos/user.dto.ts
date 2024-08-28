import { AddressDto } from "./address.dto";

export class UserDto {
  email: string;
  password: string;
  agency: string;
  account: string;
  address: AddressDto;
}
