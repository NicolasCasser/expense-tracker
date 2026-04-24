import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsPositive, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateTransactionInput {
  @Field(() => Float) 
  @IsPositive()
  @IsNotEmpty()
  amount!: number;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description!: string;
  
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;
}