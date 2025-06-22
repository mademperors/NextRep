import { IsNotEmpty } from 'class-validator';

export class FriendRequestDto {
    @IsNotEmpty()
    friendUsername: string;
}
