import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { JwtPayload } from 'src/common/constants/types/jwt-payload.interface';
import { comparePasswords } from 'src/common/utils/bcrypt';
import { Member } from 'src/database/entities/member.entity';
import { AuthFactory } from 'src/repositories/factories/auth.factory';
import { cookieConfig } from './configs/cookie.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(loginDto: AuthDto): Promise<string | null> {
    const repository = this.authFactory.getRepository(loginDto.role);

    const foundUser = await repository.findOne({ email: loginDto.email });
    if (!foundUser) return null;

    if (!comparePasswords(loginDto.password, foundUser.password)) return null;

    const payload = { email: foundUser.email, role: loginDto.role };
    return this.jwtService.sign(payload, { subject: String(foundUser.id) });
  }

  async validateJwt(payload: JwtPayload): Promise<Partial<Member> | null> {
    const repository = this.authFactory.getRepository(payload.role);

    const foundUser = await repository.findOne({
      id: +payload.sub,
      email: payload.email,
    });
    if (!foundUser) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = foundUser;
    return safeUser;
  }

  sendCookie(res: Response, jwtToken: string): void {
    res.cookie('jwt', jwtToken, cookieConfig);
  }

  clearCookie(res: Response): void {
    res.clearCookie('jwt', cookieConfig);
  }

  async signUp(dto: AuthDto): Promise<void> {
    try {
      const { role, ...data } = dto;
      const repository = this.authFactory.getRepository(role);
      await repository.create(data);
    } catch (err) {
      if (err.code === '23505') throw new ConflictException();
      else throw err;
    }
  }
}
