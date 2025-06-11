import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';
import { Challenge } from './challenge.entity';

@Entity('account_challenge')
export class AccountChallenge {
  @PrimaryColumn()
  accountUsername: string;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'accountUsername', referencedColumnName: 'username' })
  account: Account;

  @PrimaryColumn()
  challengeId: number;

  @ManyToOne(() => Challenge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'challengeId', referencedColumnName: 'id' })
  challenge: Challenge;

  @Column('boolean', { array: true, default: () => 'ARRAY[]::BOOLEAN[]' })
  completedDays: boolean[];
}
