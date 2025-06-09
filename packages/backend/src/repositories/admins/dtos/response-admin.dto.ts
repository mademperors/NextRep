import { Exclude } from 'class-transformer';

export class ResponseAdminDto {
  email: string;

  @Exclude()
  password: string;
}
