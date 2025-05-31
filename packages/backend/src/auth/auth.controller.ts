import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const jwtToken = req.user;
    this.authService.sendCookie(res, jwtToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@Req() req) {
    return req.user;
  }
}
