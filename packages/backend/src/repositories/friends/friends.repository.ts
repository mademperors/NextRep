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
      friends: [],
    };
    member?.friends?.forEach((friend) => {
      if (!responce.friends.find((f) => f.username === friend.username)) {
        responce.friends.push(friend);
      }
    });

    addNewFriendsUsernames.newFriendUsernames.forEach(async (friendUsername) => {
      const friendToAdd = await this.memberRepository.findOne({
        where: { username: friendUsername },
      });

      if (friendToAdd) {
        if (!member?.friends?.includes(friendToAdd)) {
          const { friends: _, ...friendToAddWithoutFriends } = friendToAdd;
          member?.friends?.push(friendToAddWithoutFriends);
          responce.friends.push(friendToAddWithoutFriends);
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

    return {
      friends: member?.friends || [],
    };
  }

  async remove(memberUsername: string, friendUsername: string): Promise<void> {
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
  }

  async removeAll(username: string): Promise<void> {
    const member = await this.memberRepository.findOne({
      where: { username },
      relations: ['friends'],
    });

    if (member) {
      member.friends = [];
      await this.memberRepository.save(member);
    }
  }
}

