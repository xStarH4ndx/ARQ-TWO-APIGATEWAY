import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  isVerified: boolean;

  @Field({ nullable: true })
  resetToken?: string;

  @Field({ nullable: true })
  resetTokenExpiration?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}