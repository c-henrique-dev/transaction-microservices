import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtInterface } from "src/domain/interfaces/jwt.interface";

export class JwtProvider implements JwtInterface {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  signAsync(payload: any) {
    return this.jwtService.signAsync(payload);
  }
}
