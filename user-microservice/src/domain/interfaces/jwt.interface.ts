export interface JwtInterface {
  signAsync(payload): Promise<string>;
}
