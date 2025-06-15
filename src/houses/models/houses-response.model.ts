import { ObjectType, Field, Int } from '@nestjs/graphql';
import { House } from './house.model';

@ObjectType()
export class HousesResponse {
  @Field(() => [House])
  houses: House[];

  @Field(() => Int)
  total: number;
}