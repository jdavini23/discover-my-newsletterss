import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { Interest } from './Interest';
import { Subscription } from './Subscription';
import { UserInteraction } from './UserInteraction';

export enum NewsletterFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly'
}

@Entity('newsletters')
export class Newsletter {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ length: 100 })
  authorName!: string;

  @Column({ length: 500 })
  url!: string;

  @Column({
    type: 'enum',
    enum: NewsletterFrequency,
    default: NewsletterFrequency.WEEKLY
  })
  frequency!: NewsletterFrequency;

  @Column({ type: 'float', nullable: true, default: 0 })
  averageRating?: number;

  @ManyToMany(() => Interest, { cascade: true })
  @JoinTable()
  interests!: Interest[];

  @OneToMany(() => Subscription, subscription => subscription.newsletter)
  subscriptions!: Subscription[];

  @OneToMany(() => UserInteraction, interaction => interaction.newsletter, { nullable: true })
  interactions!: UserInteraction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
