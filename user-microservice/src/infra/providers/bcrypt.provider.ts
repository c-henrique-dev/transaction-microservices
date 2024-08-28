import * as bcrypt from "bcrypt";
import { CryptographyInterface } from "src/domain/interfaces/cryptography.interface";

export class BcryptProvider implements CryptographyInterface {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
