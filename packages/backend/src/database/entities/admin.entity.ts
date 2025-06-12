import { ChildEntity } from 'typeorm';
import { Role } from '../../common/constants/enums/roles.enum';
import { Account } from './account.entity';

@ChildEntity(Role.ADMIN)
export class Admin extends Account {}
