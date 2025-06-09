import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthInfo {
  @PrimaryColumn('varchar')
  email: string;

  @Column('varchar', { length: 100, nullable: false })
  password: string;
}
