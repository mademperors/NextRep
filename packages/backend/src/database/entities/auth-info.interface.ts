import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', { length: 100, nullable: false })
  password: string;
}
