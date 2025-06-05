import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthInfo } from './auth-info.interface';

@Entity('member')
export class Member extends AuthInfo {
  @PrimaryGeneratedColumn()
  id: number;
}
