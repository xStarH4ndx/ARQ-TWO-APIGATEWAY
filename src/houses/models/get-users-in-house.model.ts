import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetUsersInHouseResponse {
  @Field(() => [String])
  userIds: string[];
}