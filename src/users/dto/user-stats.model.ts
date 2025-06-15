import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserStats {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  recentUsers: number;
}