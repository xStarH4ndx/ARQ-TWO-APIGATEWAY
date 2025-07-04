import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HouseExistsResponse {
  @Field()
  exists: boolean;
}