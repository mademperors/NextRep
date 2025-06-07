import { Entity } from 'typeorm';
import { AuthInfo } from './auth-info.interface';

@Entity('admin')
export class Admin extends AuthInfo {}
