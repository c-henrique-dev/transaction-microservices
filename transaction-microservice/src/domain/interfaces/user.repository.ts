import { UserEntity } from "../entities/user.entity";

export interface UserRepositoryInterface {
  findById(id: string): Promise<UserEntity>;
}
