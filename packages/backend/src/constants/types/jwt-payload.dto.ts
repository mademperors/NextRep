import { Role } from '../enums/roles.enum';

export interface JwtPayload {
  email: string;
  role: Role;
}
