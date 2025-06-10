import { IsEnum, IsString } from 'class-validator';
import { Role } from '../../common/constants/enums/roles.enum';

export class AuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
