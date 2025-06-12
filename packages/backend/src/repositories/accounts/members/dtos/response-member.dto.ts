import { Exclude } from 'class-transformer';

export class ResponseMemberDto {
  username: string;
  weight: number;
  height: number;
  gender: string;
  age: number;
  goal: string;
  additionalInfo: string;

  @Exclude()
  password: string;
}
