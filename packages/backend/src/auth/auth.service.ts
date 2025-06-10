import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { JwtPayload } from 'src/common/constants/types/jwt-payload.interface';
import { comparePasswords } from 'src/common/utils/bcrypt';
import { AccountFactory } from 'src/repositories/factories/account.factory';
import { AuthFactory } from 'src/repositories/factories/auth.factory';
import { cookieConfig } from './configs/cookie.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly accountFactory: AccountFactory,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(loginDto: AuthDto): Promise<string | null> {
    const repository = this.authFactory.getRepository(loginDto.role);

    const foundUser = await repository.getCredentials(loginDto.username);
    if (!foundUser) return null;
    if (!comparePasswords(loginDto.password, foundUser.password)) return null;

    const payload = { role: loginDto.role };
    return this.jwtService.sign(payload, { subject: foundUser.username });
  }

  async validateJwt(payload: JwtPayload): Promise<unknown | null> {
    const repository = this.accountFactory.getRepository(payload.role);

    const foundUser = await repository.findOne({ where: { username: payload.sub } });
    return foundUser;
  }

  sendCookie(res: Response, jwtToken: string): void {
    res.cookie('jwt', jwtToken, cookieConfig);
  }

  clearCookie(res: Response): void {
    res.clearCookie('jwt', cookieConfig);
  }

  async signUp(dto: AuthDto): Promise<void> {
    const { role, ...data } = dto;
    const repository = this.accountFactory.getRepository(role);
    await repository.create(data);
  }
}
