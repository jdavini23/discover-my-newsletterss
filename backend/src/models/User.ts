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

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

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
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role!: UserRole;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ nullable: true })
  passwordResetToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires!: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailVerificationToken!: string;

  @ManyToMany(() => Interest, { cascade: true, nullable: true })
  @JoinTable()
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