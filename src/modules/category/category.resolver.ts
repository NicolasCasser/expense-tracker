import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('data') data: CreateCategoryInput): Promise<Category> {
    return this.categoryService.createCategory(data);
  }
}