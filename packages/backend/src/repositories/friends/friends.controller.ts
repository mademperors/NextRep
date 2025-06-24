import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { FriendRequestDto } from './dtos/friend-request.dto';
import { HandleFriendRequestDto } from './dtos/handle-friend-request.dto';
import { FriendsRepository } from './friends.repository';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsRepository) { }

  @Get()
  getFriends(@Req() req: Request) {
    return this.friendsService.findAllFriends(req.user!.username);
  }

  @Post('friend-request')
  createFriendRequest(@Req() req: Request, @Body() friendRequest: FriendRequestDto) {
    return this.friendsService.createFriendRequest(req.user!.username, friendRequest);
  }

  @Patch('friend-request/accept')
  acceptFriendRequest(@Req() req: Request, @Body() friendRequest: HandleFriendRequestDto) {
    return this.friendsService.acceptFriendRequest(req.user!.username, friendRequest);
  }

  @Patch('friend-request/reject')
  rejectFriendRequest(@Req() req: Request, @Body() friendRequest: HandleFriendRequestDto) {
    return this.friendsService.rejectFriendRequest(req.user!.username, friendRequest);
  }

  @Get('friend-requests')
  getFriendRequests(@Req() req: Request) {
    return this.friendsService.getFriendRequests(req.user!.username);
  }

  @Delete('remove/:username')
  remove(@Req() req: Request, @Param('username') username: string) {
    return this.friendsService.remove(req.user!.username, username);
  }

  @Delete('removeAll')
  removeAll(@Req() req: Request) {
    return this.friendsService.removeAll(req.user!.username);
  }
}
