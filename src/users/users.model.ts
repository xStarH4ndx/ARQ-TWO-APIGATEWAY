import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => ID)
  id: string;

  @Field()
  authId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  isActive: boolean;

  @Field()
  lastLogin: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}