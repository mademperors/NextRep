import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthInfo {
  @PrimaryColumn('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 100, nullable: false })
  password: string;
}
