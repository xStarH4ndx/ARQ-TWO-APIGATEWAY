import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchHousesByNameInput {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  limit?: number;
}