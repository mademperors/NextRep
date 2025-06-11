import { IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
