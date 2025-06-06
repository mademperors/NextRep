import { Column, Entity } from 'typeorm';

@Entity()
export class AuthInfo {
  @Column('varchar', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;
}
