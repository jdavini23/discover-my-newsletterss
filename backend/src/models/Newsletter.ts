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
    type: 'varchar',
    length: 20,
    default: 'weekly'
  })
  frequency!: string;

  @Column({ type: 'float', nullable: true, default: 0 })
  averageRating?: number;

  @ManyToMany(() => Interest, { cascade: true })
  @JoinTable()
  interests!: Interest[];

  @OneToMany(() => Subscription, subscription => subscription.newsletter)
  subscriptions!: Subscription[];

  @OneToMany(() => UserInteraction, interaction => interaction.newsletter)
  interactions!: UserInteraction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
