import { Role } from '../enums/roles.enum';

export interface LoginDto {
  email: string;
  password: string;
  role: Role;
}
