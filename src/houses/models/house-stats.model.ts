import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class GetHouseStatsResponse {
  @Field(() => Int)
  totalHouses: number;

  @Field(() => Int)
  recentHouses: number;

  @Field(() => Int)
  housesWithUsers: number;

  @Field(() => Int)
  housesWithoutUsers: number;

  @Field(() => Float)
  averageUsersPerHouse: number;
}