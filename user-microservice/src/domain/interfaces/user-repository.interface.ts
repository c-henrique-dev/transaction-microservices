import { UserEntity } from "../entities/user.entity";

export interface UserRepositoryInterface {
  insert(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
}
