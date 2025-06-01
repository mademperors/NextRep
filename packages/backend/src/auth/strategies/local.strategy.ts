import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Role } from '../utils/roles.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string) {
    const role = req.body.role;
    if (!Object.values(Role).includes(role)) throw new BadRequestException();

    const logged = await this.authService.validateLocal(email, password, role);
    if (!logged) throw new UnauthorizedException();

    return logged;
  }
}
