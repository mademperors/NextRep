import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { Role } from '../../common/constants/enums/roles.enum';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dtos/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: Request, username: string, password: string) {
    const role: Role = req.body.role;
    const loginDto: AuthDto = { username, password, role };

    const logged = await this.authService.validateLocal(loginDto);
    if (!logged) throw new UnauthorizedException();

    return logged;
  }
}
