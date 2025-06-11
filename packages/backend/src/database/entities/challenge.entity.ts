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
import { Status } from '../../common/constants/enums/status.enum';
import { AccountChallenge } from './account-challenge.entity';
import { Account } from './account.entity';
import { Training } from './training.entity';

@Entity('challenge')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  challengeInfo: string;

  @Column('enum', { enum: ChallengeType, nullable: false })
  challengeType: ChallengeType;

  @Column({ type: 'integer', nullable: false })
  duration: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  currentDay: number;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column('enum', { enum: Status, nullable: false, default: Status.ENROLLMENT })
  status: Status;

  @ManyToOne(() => Account, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'creator', referencedColumnName: 'username' })
  creator: Account;

  @ManyToMany(() => Training, { cascade: false })
  @JoinTable({
    name: 'challenge_trainings',
    joinColumn: {
      name: 'challengeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trainingId',
      referencedColumnName: 'id',
    },
  })
  trainings: Training[];

  @OneToMany(() => AccountChallenge, (enrolled) => enrolled.challenge, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  enrolled: AccountChallenge[];
}
