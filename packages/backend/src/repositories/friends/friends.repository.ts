import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from 'src/database/entities/friend-request.entity';
import { Member } from 'src/database/entities/member.entity';
import { Repository } from 'typeorm';
import { AddNewFriendsDto } from './dtos/add-new-friends.dto';
import { FriendRequestDto } from './dtos/friend-request.dto';
import { HandleFriendRequestDto } from './dtos/handle-friend-request.dto';
import { ResponseFriendsDto } from './dtos/response-friends.dto';

@Injectable()
export class FriendsRepository {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(FriendRequest) private readonly friendRequestRepository: Repository<FriendRequest>,
  ) { }

  async createFriendRequest(username: string, friendRequest: FriendRequestDto): Promise<void> {
    const member = await this.memberRepository.findOne({
      where: { username },
    });

    const friend = await this.memberRepository.findOne({
      where: { username: friendRequest.friendUsername },
    });

    if (!member) {
      console.log('Member not found');
      throw new NotFoundException('Member not found');
    }

    if (!friend) {
      console.log('Friend not found');
      throw new NotFoundException('Friend not found');
    }

    const existingRequest = await this.friendRequestRepository.findOne({
      where: [
        { senderUsername: member.username, receiverUsername: friend.username },
        { senderUsername: friend.username, receiverUsername: member.username }
      ]
    });

    if (existingRequest) {
      throw new BadRequestException('Friend request already exists');
    }

    const newFriendRequest = new FriendRequest();
    newFriendRequest.sender = member;
    newFriendRequest.receiver = friend;
    await this.friendRequestRepository.save(newFriendRequest);
  }

  async acceptFriendRequest(username: string, friendRequestDto: HandleFriendRequestDto): Promise<void> {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: friendRequestDto.requestId },
      relations: ['sender', 'receiver'],
    });

    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }

    const memberUsername = friendRequest.receiverUsername;
    const friendUsername = friendRequest.senderUsername;

    const member = await this.memberRepository.findOne({
      where: { username: memberUsername },
      relations: ['friends'],
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const friend = await this.memberRepository.findOne({
      where: { username: friendUsername },
      relations: ['friends'],
    });

    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    if (member.friends?.find((f) => f.username === friend.username)) {
      throw new BadRequestException('Friend already exists');
    }

    member.friends = [...(member.friends || []), friend];
    friend.friends = [...(friend.friends || []), member];
    await this.memberRepository.save(member);
    await this.memberRepository.save(friend);
    await this.friendRequestRepository.delete(friendRequest.id);
  }

  async rejectFriendRequest(username: string, friendRequestDto: HandleFriendRequestDto): Promise<void> {
    await this.friendRequestRepository.delete(friendRequestDto.requestId);
  }

  async getFriendRequests(username: string): Promise<FriendRequest[]> {
    return await this.friendRequestRepository.find({
      where: { receiverUsername: username },
    });
  }

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

