import { Exclude } from 'class-transformer';

export class ResponseMemberDto {
  username: string;
  weight: number;
  height: number;
  gender: number;
  age: number;
  goal: string;
  additionalInfo: string;

  @Exclude()
  password: string;
}
