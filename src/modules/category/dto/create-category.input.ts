import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Nome da categoria de despesa' })
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio' })
  @Transform(({ value}) => typeof value === 'string' ? value.trim() : value) // Limpa espaços extras
  name!: string;
}