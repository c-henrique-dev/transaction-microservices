import { UserRepositoryInterface } from "src/domain/interfaces/user-repository.interface";
import { CryptographyInterface } from "src/domain/interfaces/cryptography.interface";
import { UnauthorizedException } from "src/domain/exceptions/api.error";
import { JwtInterface } from "src/domain/interfaces/jwt.interface";

export class SigninUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private cryptographyInterface: CryptographyInterface,
    private jwtInterface: JwtInterface,
  ) {}

  async execute(signinInput: SigninInput): Promise<SigninOutput> {
    const user = await this.userRepository.findByEmail(signinInput.email);

    if (!user || !(await this.cryptographyInterface.compare(signinInput.password, user.getPassword()))) {
      throw new UnauthorizedException("Invalid credentials. Make sure your email address and password are correct.");
    }

    const data = {
      email: user.getEmail(),
    };

    const payload = { user: data };

    return { accessToken: await this.jwtInterface.signAsync(payload) };
  }
}

type SigninInput = {
  email: string;
  password: string;
};

type SigninOutput = {
  accessToken: string;
};
