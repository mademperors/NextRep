import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersRepository } from 'src/repositories/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateLocal(payloadEmail: string, payloadPassword: string, role: string) {
    const foundUser = await this.userRepository.findOneBy({ email: payloadEmail });
    if (!foundUser) return null;

    if (foundUser.password !== payloadPassword) return null;

    const { id, password, ...user } = foundUser;
    return this.jwtService.sign({ ...user, role }, { subject: String(id) });
  }

  async validateJwt(payload: Record<string, any>) {
    const foundUser = await this.userRepository.findOneBy({
      id: payload.sub,
      email: payload.email,
    });
    if (!foundUser) return null;

    const { password, ...safeUser } = foundUser;
    return safeUser;
  }

  sendCookie(res: Response, jwtToken: string) {
    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15, //15 minutes
      sameSite: 'lax',
      path: '/NextRep/api',
    });
  }

  clearCookie(res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/NextRep/api',
    });
  }
}
