import { Role } from '../enums/roles.enum';

export interface UserPayload {
  username: string;
  role: Role;
}
