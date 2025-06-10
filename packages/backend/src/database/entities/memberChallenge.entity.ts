import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Challenge } from './challenge.entity';
import { Member } from './member.entity';

@Entity('member_challenge')
export class MemberChallenge {
  @PrimaryColumn()
  member_username: string;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_username', referencedColumnName: 'username' })
  member: Member;

  @PrimaryColumn()
  challenge_id: number;

  @ManyToOne(() => Challenge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'challenge_id', referencedColumnName: 'id' })
  challenge: Challenge;

  @Column('boolean', { array: true, default: () => 'ARRAY[]::BOOLEAN[]' })
  completed_days: boolean[];
}
