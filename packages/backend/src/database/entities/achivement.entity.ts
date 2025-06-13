import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('achievement')
export class Achivement {
  @PrimaryGeneratedColumn()
  achievement_id: number;

  @Column({ type: 'text', nullable: false })
  achievement_info: string;
}
