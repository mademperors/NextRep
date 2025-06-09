import { Role } from '../enums/roles.enum';

export interface UserPayload {
  email: string;
  role: Role;
}
