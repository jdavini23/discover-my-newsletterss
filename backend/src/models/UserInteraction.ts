import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './User';
import { Newsletter } from './Newsletter';

export enum InteractionType {
  VIEW = 'view',
  LIKE = 'like',
  SAVE = 'save',
  SHARE = 'share'
}

@Entity('user_interactions')
export class UserInteraction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.interactions)
  user!: User;

  @ManyToOne(() => Newsletter, newsletter => newsletter.interactions)
  newsletter!: Newsletter;

  @Column({
    type: 'enum',
    enum: InteractionType
  })
  interactionType!: InteractionType;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ type: 'text', nullable: true })
  details?: string;
}
