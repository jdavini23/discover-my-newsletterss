import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany 
} from 'typeorm';
import { User } from './User';

@Entity('interests')
export class Interest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  icon?: string;

  @ManyToMany(() => User, user => user.preferences)
  users!: User[];
}
