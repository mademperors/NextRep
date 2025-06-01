import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateLocal(payloadEmail: string, payloadPassword: string, role: string) {
    const foundUser = await this._findUserByEmail(payloadEmail);
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

  private async _findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
