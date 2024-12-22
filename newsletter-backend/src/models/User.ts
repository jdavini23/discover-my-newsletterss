import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

  @Column({ nullable: true })
  password!: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'user',
  })
  role!: string;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ nullable: true, type: 'varchar' })
  passwordResetToken!: string | null;

  @Column({ type: 'datetime', nullable: true })
  passwordResetExpires!: Date | null;

  @Column({ nullable: true, unique: true })
  emailVerificationToken!: string | null;

  @Column({ nullable: true, unique: true })
  googleId!: string | null;

  @Column({ nullable: true, unique: true })
  facebookId!: string | null;

  @Column({ 
    type: 'enum', 
    enum: ['local', 'google', 'facebook'], 
    default: 'local' 
  })
  authProvider!: string;

  @ManyToMany(() => Interest)
  @JoinTable()
  interests!: Interest[];

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions!: Subscription[];

  @OneToMany(() => UserInteraction, interaction => interaction.user)
  interactions!: UserInteraction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
