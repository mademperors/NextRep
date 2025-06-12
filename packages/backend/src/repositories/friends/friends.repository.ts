import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/database/entities/member.entity';
import { Repository } from 'typeorm';
import { AddNewFriendsDto } from './dtos/add-new-friends.dto';
import { ResponseFriendsDto } from './dtos/response-friends.dto';

@Injectable()
export class FriendsRepository {
  constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {}

  async update(
    username: string,
    addNewFriendsUsernames: AddNewFriendsDto,
  ): Promise<ResponseFriendsDto> {
    const member = await this.memberRepository.findOne({
      where: { username },
      relations: ['friends'],
    });

    if (member && member?.friends === undefined) {
      member.friends = [];
    }

    const responce: ResponseFriendsDto = {
      friendUsernames: [],
    };
    member?.friends?.forEach((friend) => {
      if (!responce.friendUsernames.includes(friend.username)) {
        responce.friendUsernames.push(friend.username);
      }
    });

    addNewFriendsUsernames.newFriendUsernames.forEach(async (friendUsername) => {
      const friendToAdd = await this.memberRepository.findOne({
        where: { username: friendUsername },
      });

      if (friendToAdd) {
        if (!member?.friends?.includes(friendToAdd)) {
          member?.friends?.push(friendToAdd);
          responce.friendUsernames.push(friendToAdd.username);
        }
      }
    });
    if (member) {
      await this.memberRepository.save(member);
    }
    return responce;
  }
  async findAllFriends(username: string): Promise<ResponseFriendsDto> {
    const member = await this.memberRepository.findOne({
      where: { username },
      relations: ['friends'],
    });

    const friendUsernames = member?.friends?.map((friend) => friend.username) || [];
    return {
      friendUsernames: friendUsernames,
    };
  }

  async remove(memberUsername: string, friendUsername: string): Promise<ResponseFriendsDto> {
    const member = await this.memberRepository.findOne({
      where: { username: memberUsername },
      relations: ['friends'],
    });

    if (member) {
      member.friends = member.friends?.filter((friend) => friend.username !== friendUsername) || [];
    }

    if (member) {
      await this.memberRepository.save(member);
    }
    return {
      friendUsernames: [friendUsername],
    };
  }

  async removeAll(username: string): Promise<ResponseFriendsDto> {
    const member = await this.memberRepository.findOne({
      where: { username },
      relations: ['friends'],
    });

    const friendToDelete = member?.friends?.map((friend) => friend.username) || [];

    if (member) {
      member.friends = [];
      await this.memberRepository.save(member);
    }
    return {
      friendUsernames: friendToDelete,
    };
  }
}
