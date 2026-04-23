import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { name: 'createCategory' })
  async create(@Args('data') data: CreateCategoryInput): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  async update(
    @Args('id', { type: () => ID}) id: string,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Mutation(() => String, { name: 'deleteCategory' })
  async delete(@Args('id', { type: () => ID }) id: string): Promise<string> {
    return this.categoryService.delete(id);
  }

  @Query(() => [Category], { name: 'findAllCategories' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'findCategoryById' })
  async findById(@Args('id', { type: () => ID }) id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }
}