import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Challenge } from './challenge.entity';
import { Member } from './member.entity';

@Entity('member_challenge')
export class MemberChallenge {
  @PrimaryColumn()
  member_email: string;

  @ManyToOne(() => Member, (member) => member.email, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_email', referencedColumnName: 'email' })
  member: Member;

  @PrimaryColumn()
  challenge_id: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.challenge_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'challenge_id', referencedColumnName: 'challenge_id' })
  challenge: Challenge;

  @Column({ type: 'integer', nullable: false })
  duration: number;
}
