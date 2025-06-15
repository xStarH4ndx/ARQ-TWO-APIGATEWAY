import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchUsersByNameInput {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  limit?: number;
}