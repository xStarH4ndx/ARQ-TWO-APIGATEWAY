import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class House {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  code: string;

  @Field(() => [String])
  userIds: string[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}