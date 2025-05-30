import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthInfo } from './auth-info.interface';

@Entity()
export class User extends AuthInfo {
  @PrimaryGeneratedColumn()
  id: number;
}
