import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/common/constants/enums/gender.enum';

export class UpdateMemberDto {
  @IsNumber()
  @IsOptional()
  weight?: number; //kg

  @IsNumber()
  @IsOptional()
  height?: number; //cm

  @IsEnum(Gender)
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

  // @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
