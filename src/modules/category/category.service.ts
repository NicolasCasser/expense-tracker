import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryInput } from "./dto/create-category.input";

export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoryRepository.create(data);

    return await this.categoryRepository.save(newCategory);
  }
}
