import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const jwtToken = req.user;

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      sameSite: true,
      path: '/NextRep/api',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status() {
    return;
  }
}
