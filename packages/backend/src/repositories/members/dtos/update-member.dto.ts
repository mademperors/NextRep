import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/common/constants/enums/gender.enum';

export class UpdateMemberDto {
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 },
    { message: 'Weight must be a number with 1 decimal place(e.g. 66.6)' },
  )
  @IsOptional()
  weight?: number; //kg

  @IsInt()
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

  @IsString()
  @IsOptional()
  password?: string;
}
