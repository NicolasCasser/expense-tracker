import { Module } from "@nestjs/common";
import { Category } from "./entities/category.entity";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoryService,
    CategoryResolver
  ],
})
export class CategoryModule {}