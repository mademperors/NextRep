import { Role } from '../enums/roles.enum';

export interface JwtPayload {
  role: Role;
  sub: string;
}
