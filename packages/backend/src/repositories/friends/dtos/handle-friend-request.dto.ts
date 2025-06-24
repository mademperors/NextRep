import { IsNotEmpty } from 'class-validator';

export class HandleFriendRequestDto {
    @IsNotEmpty()
    requestId: number;
}
