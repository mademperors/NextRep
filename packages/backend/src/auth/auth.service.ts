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

  async validate(payloadEmail: string, payloadPassword: string) {
    const foundUser = await this._findUserByEmail(payloadEmail);
    if (!foundUser) return null;

    if (foundUser.password !== payloadPassword) return null;

    const { password, ...user } = foundUser;
    return this.jwtService.sign(user);
  }

  async validateJwt(payload: Record<string, any>) {
    const foundUser = await this._findUserByEmail(payload.email);
    if (!foundUser) return null;
    return foundUser;
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
