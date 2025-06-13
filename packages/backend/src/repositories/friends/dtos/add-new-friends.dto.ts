import { IsArray, IsNotEmpty } from 'class-validator';

export class AddNewFriendsDto {
  @IsNotEmpty()
  @IsArray()
  newFriendUsernames: string[];
}
