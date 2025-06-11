import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserPayload } from 'src/common/constants/types/user-payload.interface';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthDto } from './dtos/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Req() req, @Res({ passthrough: true }) res: Response): void {
    const jwtToken = req.user;
    this.authService.sendCookie(res, jwtToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signOut')
  signOut(@Res({ passthrough: true }) res: Response): void {
    this.authService.clearCookie(res);
  }

  @Public()
  @Post('signUp')
  async signUp(@Body() createAccountDto: AuthDto): Promise<void> {
    await this.authService.signUp(createAccountDto);
  }

  //for front jwt parsing
  @Get('me')
  status(@Req() req): UserPayload {
    return req.user;
  }
}
