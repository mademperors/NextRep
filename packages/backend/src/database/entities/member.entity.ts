import { Column,Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Gender } from '../../common/constants/enums/gender.enum';
import { Goal } from '../../common/constants/enums/goal.enum';
import { Role } from '../../common/constants/enums/roles.enum';
import { Account } from './account.entity';
import { Achivement } from './achivement.entity';

@ChildEntity(Role.MEMBER)
export class Member extends Account {
  @Column('decimal', { precision: 4, scale: 1, nullable: true })
  weight?: number;

  @Column('int', { nullable: true })
  height?: number;

  @Column('enum', { enum: Gender, nullable: true })
  gender?: Gender;

  @Column('int', { nullable: true })
  age?: number;

  @Column('enum', { enum: Goal, nullable: true })
  goal?: Goal;

  @Column('text', { nullable: true })
  additionalInfo?: string;

  @ManyToMany(() => Achivement, { nullable: true, onDelete: 'NO ACTION' })
  @JoinTable()
  achivements?: Achivement[];
}
