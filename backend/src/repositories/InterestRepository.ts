import { Repository } from 'typeorm';
import { Interest } from '../models/Interest';
import { BaseRepository } from './BaseRepository';
import { AppDataSource } from '../config/database';

export class InterestRepository extends BaseRepository<Interest> {
  constructor() {
    super(AppDataSource.getRepository(Interest));
  }

  async findByName(name: string): Promise<Interest | null> {
    return this.repository.findOne({
      where: { name },
      relations: ['users'],
    });
  }
}
