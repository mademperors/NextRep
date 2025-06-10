import { IsString } from 'class-validator';

export class ResponsePublicMemberDto {
  @IsString()
  username: string;
}
