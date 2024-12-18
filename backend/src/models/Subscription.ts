import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './User';
import { Newsletter } from './Newsletter';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.subscriptions)
  user!: User;

  @ManyToOne(() => Newsletter, newsletter => newsletter.subscriptions)
  newsletter!: Newsletter;

  @CreateDateColumn()
  subscribedAt!: Date;

  @Column({ default: true })
  isActive: boolean = true;
}
