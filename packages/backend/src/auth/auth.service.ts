import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { comparePasswords } from 'src/common/utils/bcrypt';
import { JwtPayload } from 'src/constants/types/jwt-payload.dto';
import { LoginDto } from 'src/constants/types/login.dto';
import { Member } from 'src/database/entities/member.entity';
import { CreateMemberDto } from 'src/repositories/members/dtos/create-member.dto';
import { MembersRepository } from 'src/repositories/members/member.repository';
import { cookieConfig } from './configs/cookie.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: MembersRepository,
    private jwtService: JwtService,
  ) {}

  async validateLocal(loginDto: LoginDto): Promise<string | null> {
    const foundUser = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!foundUser) return null;

    if (!comparePasswords(loginDto.password, foundUser.password)) return null;

    const payload: JwtPayload = { email: foundUser.email, role: loginDto.role };
    return this.jwtService.sign(payload, { subject: String(foundUser.id) });
  }

  async validateJwt(payload: Record<string, string | number>): Promise<Partial<Member> | null> {
    const foundUser = await this.userRepository.findOneBy({
      id: payload.sub,
      email: payload.email,
    });
    if (!foundUser) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = foundUser;
    return safeUser;
  }

  sendCookie(res: Response, jwtToken: string): void {
    res.cookie('jwt', jwtToken, cookieConfig);
  }

  clearCookie(res: Response): void {
    res.clearCookie('jwt', cookieConfig);
  }

  async signUp(dto: CreateMemberDto): Promise<void> {
    try {
      await this.userRepository.create(dto);
    } catch (err) {
      if (err.code === '23505') throw new ConflictException();
      else throw err;
    }
  }
}
