import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from 'src/constants/enums/roles.enum';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { AdminsRepository } from '../admins/admin.repository';
import { IREST } from '../interfaces/irest.interface';
import { MembersRepository } from '../members/member.repository';

@Injectable()
export class AuthFactory {
  private readonly repoStrategy: Record<Role, IREST<AuthInfo, unknown>>;

  constructor(
    private readonly memberRepository: MembersRepository,
    private readonly adminRepository: AdminsRepository,
  ) {
    this.repoStrategy = {
      [Role.ADMIN]: this.adminRepository,
      [Role.MEMBER]: this.memberRepository,
    };
  }

  getRepository(role: Role): IREST<AuthInfo, unknown> {
    const repo = this.repoStrategy[role];
    if (!repo) throw new BadRequestException(`'${role}' role is not defined`);
    return repo;
  }
}
