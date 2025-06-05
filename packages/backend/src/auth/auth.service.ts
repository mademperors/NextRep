import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateMemberDto } from 'src/repositories/members/dtos/create-member.dto';
import { MembersRepository } from 'src/repositories/members/member.repository';
import { cookieConfig } from './utils/cookie.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: MembersRepository,
    private jwtService: JwtService,
  ) {}

  async validateLocal(payloadEmail: string, payloadPassword: string, role: string) {
    const foundUser = await this.userRepository.findOneBy({ email: payloadEmail });
    if (!foundUser) return null;

    if (foundUser.password !== payloadPassword) return null;

    const { id, password, ...user } = foundUser;
    return this.jwtService.sign({ ...user, role }, { subject: String(id) });
  }

  async validateJwt(payload: Record<string, string | number>) {
    const foundUser = await this.userRepository.findOneBy({
      id: payload.sub,
      email: payload.email,
    });
    if (!foundUser) return null;

    const { password, ...safeUser } = foundUser;
    return safeUser;
  }

  sendCookie(res: Response, jwtToken: string) {
    res.cookie('jwt', jwtToken, cookieConfig);
  }

  clearCookie(res: Response) {
    res.clearCookie('jwt', cookieConfig);
  }

  signUp(dto: CreateMemberDto) {
    this.userRepository.create(dto);
  }
}
