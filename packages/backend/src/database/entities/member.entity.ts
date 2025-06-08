import { Column, Entity } from 'typeorm';
import { Gender } from '../../common/constants/enums/gender.enum';
import { AuthInfo } from './auth-info.interface';

@Entity('member')
export class Member extends AuthInfo {
  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  height?: number;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  goal?: string;

  @Column({ nullable: true })
  additional_info?: string;
}
