import { Entity, OneToMany } from 'typeorm';
import { AuthInfo } from './auth-info.interface';
import { Challenge } from './challenge.entity';
import { MemberChallenge } from './memberChallenge.entity';

@Entity('member')
export class Member extends AuthInfo {
  @OneToMany(() => Challenge, (challenge) => challenge.challengeCreator)
  createdChallenges: Challenge[];

  @OneToMany(() => MemberChallenge, (memberChallenge) => memberChallenge.challenge)
  memberChallenges: MemberChallenge[];
}
