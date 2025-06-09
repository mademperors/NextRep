import { Exclude } from 'class-transformer';

export class ResponseMemberDto {
  email: string;
  weight: number;
  height: number;
  gender: number;
  age: number;
  goal: string;
  additional_info: string;

  @Exclude()
  password: string;
}
