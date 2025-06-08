import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from 'src/common/constants/enums/roles.enum';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { AdminsRepository } from '../admins/admin.repository';
import { ICRUD } from '../interfaces/icrud.interface';
import { MembersRepository } from '../members/member.repository';

@Injectable()
export class AuthFactory {
  private readonly repoStrategy: Record<Role, ICRUD<AuthInfo, unknown>>;

  constructor(
    private readonly memberRepository: MembersRepository,
    private readonly adminRepository: AdminsRepository,
  ) {
    this.repoStrategy = {
      [Role.ADMIN]: this.adminRepository,
      [Role.MEMBER]: this.memberRepository,
    };
  }

  getRepository(role: Role): ICRUD<AuthInfo, unknown> {
    const repo = this.repoStrategy[role];
    if (!repo) throw new BadRequestException(`'${role}' role is not defined`);
    return repo;
  }
}
