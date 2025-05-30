import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validate(payloadEmail: string, payloadPassword: string) {
    const foundUser = await this._findUser(payloadEmail);
    if (!foundUser) return null;

    if (foundUser.password !== payloadPassword) return null;

    const { password, ...user } = foundUser;
    return this.jwtService.sign(user);
  }

  private async _findUser(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
