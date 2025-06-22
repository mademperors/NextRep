import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Member } from './member.entity';

@Entity('friend_request')
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50, name: 'sender_username' })
    senderUsername: string;

    @Column('varchar', { length: 50, name: 'receiver_username' })
    receiverUsername: string;

    @ManyToOne(() => Member, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sender_username', referencedColumnName: 'username' })
    sender: Member;

    @ManyToOne(() => Member, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'receiver_username', referencedColumnName: 'username' })
    receiver: Member;

    @Column('text', { nullable: true })
    message?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
} 