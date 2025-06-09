import { Column, Entity } from 'typeorm';
import { Gender } from '../../common/constants/enums/gender.enum';
import { Goal } from '../../common/constants/enums/goal.enum';
import { AuthInfo } from './auth-info.interface';

@Entity('member')
export class Member extends AuthInfo {
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
  additional_info?: string;
}
