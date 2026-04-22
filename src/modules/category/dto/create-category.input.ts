import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio' })
  name!: string;
}