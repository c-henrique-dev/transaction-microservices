export class UserEntity {
  id: string;
  email: string;
  password: string;

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
    };
  }
}
