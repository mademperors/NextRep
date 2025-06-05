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
import { CreateMemberDto } from 'src/repositories/members/dtos/create-member.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Req() req, @Res({ passthrough: true }) res: Response) {
    const jwtToken = req.user;
    this.authService.sendCookie(res, jwtToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signOut(@Res({ passthrough: true }) res: Response) {
    this.authService.clearCookie(res);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() createUserDto: CreateMemberDto) {
    this.authService.signUp(createUserDto);
  }

  //dev endpoint
  @Get('status')
  status(@Req() req) {
    return req.user;
  }
}
