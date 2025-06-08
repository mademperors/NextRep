import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  weight?: number; //kg

  @IsNumber()
  @IsOptional()
  height?: number; //cm

  @IsNumber()
  @IsOptional()
  gender?: number;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  goal?: string;

  @IsString()
  @IsOptional()
  additional_info?: string;
}
