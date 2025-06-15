import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class IsUserInHouseResponse {
  @Field()
  isInHouse: boolean;
}