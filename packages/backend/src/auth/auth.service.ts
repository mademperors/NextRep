import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { JwtPayload } from 'src/common/constants/types/jwt-payload.interface';
import { comparePasswords } from 'src/common/utils/bcrypt';
import { AccountRepository } from 'src/repositories/accounts/accounts.repository';
import { cookieConfig } from './configs/cookie.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountsRepository: AccountRepository,
  ) {}

  async validateLocal(loginDto: AuthDto): Promise<string | null> {
    const foundUser = await this.accountsRepository.getCredentials(loginDto.username);
    if (!foundUser) return null;

    if (!comparePasswords(loginDto.password, foundUser.password)) return null;
    if (foundUser.accountType !== loginDto.role) return null;

    const payload = { role: foundUser.accountType };
    return this.jwtService.sign(payload, { subject: foundUser.username });
  }

  async validateJwt(payload: JwtPayload): Promise<unknown | null> {
    try {
      const account = await this.accountsRepository.validateAccountType(payload.sub, payload.role);
      return account;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  sendCookie(res: Response, jwtToken: string): void {
    res.cookie('jwt', jwtToken, cookieConfig);
  }

  clearCookie(res: Response): void {
    res.clearCookie('jwt', cookieConfig);
  }

  async signUp(dto: AuthDto): Promise<void> {
    await this.accountsRepository.create(dto.username, dto.password, dto.role);
  }
}
