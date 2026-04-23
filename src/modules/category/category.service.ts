import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryInput } from './dto/update-category.input';

export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(data);

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find(); 
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException({ message: 'Category not found' });
    }

    return category;
  }

  async update(
    id: string,
    data: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.findById(id);

    Object.assign(category, data);
    return this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<string> {
    const result = await this.categoryRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Category not found');
    }

    return 'Category deleted seccessfully';
  }
}
