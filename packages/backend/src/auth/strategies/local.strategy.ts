import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      //   passReqToCallback: true,
    });
  }

  // add roles later
  async validate(email: string, password: string) {
    const logged = await this.authService.validate(email, password);
    if (!logged) throw new UnauthorizedException();

    return logged;
  }
}
