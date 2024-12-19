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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'user'
  })
  role!: string;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ nullable: true, type: 'varchar' })
  passwordResetToken!: string;

  @Column({ type: 'datetime', nullable: true })
  passwordResetExpires!: Date | null;

  @Column({ nullable: true, type: 'varchar' })
  emailVerificationToken!: string;

  @ManyToMany(() => Interest, interest => interest.users, { cascade: true })
  @JoinTable({
    name: 'user_interests',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'interestId', referencedColumnName: 'id' }
  })
  preferences!: Interest[];

  @OneToMany(() => Subscription, subscription => subscription.user, { nullable: true })
  subscriptions!: Subscription[];

  @OneToMany(() => UserInteraction, interaction => interaction.user, { nullable: true })
  interactions!: UserInteraction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}