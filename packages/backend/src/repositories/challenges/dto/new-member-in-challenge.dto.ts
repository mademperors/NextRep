import { IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty({ message: 'memberEmail is required.' })
  memberEmail: string;
}
