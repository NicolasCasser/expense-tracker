import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTransactionInput } from "./create-transaction.input";



@InputType()
export class UpdateTransactioninput extends PartialType(CreateTransactionInput) { 


}