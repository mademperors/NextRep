import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Achivement')
export class Achivement {
  @PrimaryGeneratedColumn()
  achivement_id: string;

  @Column({ type: 'text', nullable: false })
  achivement_info: string;
}
