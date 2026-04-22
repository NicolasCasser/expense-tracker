import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
}
