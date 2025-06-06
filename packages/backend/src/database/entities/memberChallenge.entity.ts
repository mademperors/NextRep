import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Challenge } from './challenge.entity';
import { Member } from './member.entity';

@Entity('member_challenge')
export class MemberChallenge {
  @PrimaryColumn()
  member_email: string;

  @PrimaryColumn()
  challenge_id: number;

  @Column({ type: 'integer', nullable: false })
  duration: number;

  @ManyToOne(() => Member, (member) => member.memberChallenges, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_email', referencedColumnName: 'email' })
  member: Member;

  @ManyToOne(() => Challenge, (challenge) => challenge.memberChallenges, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'challenge_id', referencedColumnName: 'challenge_id' })
  challenge: Challenge;
}
