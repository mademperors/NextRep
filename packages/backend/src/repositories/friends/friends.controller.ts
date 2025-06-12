import { Body, Controller, Delete, Get, Param, Patch, Req } from '@nestjs/common';
import { Request } from 'express';
import { AddNewFriendsDto } from './dtos/add-new-friends.dto';
import { FriendsRepository } from './friends.repository';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsRepository) {}

  @Get()
  getFriends(@Req() req: Request) {
    return this.friendsService.findAllFriends(req.user!.username);
  }

  @Patch('addNewFriends')
  update(@Req() req: Request, @Body() addNewFriendsEmails: AddNewFriendsDto) {
    return this.friendsService.update(req.user!.username, addNewFriendsEmails);
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
