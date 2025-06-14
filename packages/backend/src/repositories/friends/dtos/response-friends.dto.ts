import { Member } from 'src/database/entities/member.entity';

export class ResponseFriendsDto {
  friends: Omit<Member, 'friends' | 'password'>[];
}

