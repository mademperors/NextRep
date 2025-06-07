import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../constants/enums/roles.enum';

export class AuthDto {
  // @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
