import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity('challenge')
export class Challenge {
  @PrimaryGeneratedColumn()
  challenge_id: number;

  @Column({ type: 'integer', nullable: false })
  duration: number;

  @Column({ type: 'text', nullable: false })
  challenge_info: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  challenge_type: string;

  @ManyToOne(() => Member, (member) => member.email, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'email' })
  createdBy: Member["email"];
}
