import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  // @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
