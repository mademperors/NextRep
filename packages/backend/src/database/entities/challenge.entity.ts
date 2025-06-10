import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChallengeType } from '../../common/constants/enums/challenge-types.enum';
import { Member } from './member.entity';
import { MemberChallenge } from './memberChallenge.entity';
import { Training } from './training.entity';

@Entity('challenge')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  challenge_info: string;

  @Column('enum', { enum: ChallengeType, nullable: false })
  challenge_type: ChallengeType;

  @Column({ type: 'integer', nullable: false })
  duration: number;

  @Column({ type: 'integer', nullable: false, default: 1 })
  current_day: number;

  @ManyToOne(() => Member, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'creator', referencedColumnName: 'username' })
  creator: Member;

  @ManyToMany(() => Training, { cascade: false })
  @JoinTable({
    name: 'challenge_trainings',
    joinColumn: {
      name: 'challenge_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'training_id',
      referencedColumnName: 'id',
    },
  })
  trainings: Training[];

  @OneToMany(() => MemberChallenge, (enrolled) => enrolled.challenge, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  enrolledMembers: MemberChallenge[];
}
