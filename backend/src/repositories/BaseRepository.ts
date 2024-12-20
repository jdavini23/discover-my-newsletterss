import { Repository, ObjectLiteral, DeepPartial, FindOptionsWhere } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ 
      where: { id } as FindOptionsWhere<T> 
    });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findBy(conditions: Partial<T>): Promise<T[]> {
    return this.repository.find({ 
      where: conditions as FindOptionsWhere<T> 
    });
  }
}
