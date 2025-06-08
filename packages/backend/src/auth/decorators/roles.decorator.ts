import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/constants/enums/roles.enum';

export const ROLES_KEY: string = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
