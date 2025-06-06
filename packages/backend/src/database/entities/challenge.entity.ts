import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './member.entity';
import { MemberChallenge } from './memberChallenge.entity';

@Entity('challenge')
export class Challenge {
  @PrimaryGeneratedColumn()
  challenge_id: number;

  @Column({ type: 'integer', nullable: false })
  duration: number;

  @Column({ type: 'text', nullable: false })
  challenge_info: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  challenge_type: string;

  @ManyToOne(() => Member, (member) => member.createdChallenges)
  challengeCreator: Member;

  @OneToMany(() => MemberChallenge, (memberChallenge) => memberChallenge.challenge)
  memberChallenges: MemberChallenge[];
}
