import { Repository } from 'typeorm';
import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';
import { AppDataSource } from '../config/database';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(AppDataSource.getRepository(User));
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
      relations: ['preferences', 'subscriptions'],
    });
  }

  async createWithPreferences(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
