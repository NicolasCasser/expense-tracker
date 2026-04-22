import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsPositive, IsUUID } from "class-validator";

@InputType()
export class CreateTransactionInput {
  @Field(() => Float) // No Graphql números decimais precisam ser explicitados
  @IsPositive()
  @IsNotEmpty()
  amount!: number;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;
}