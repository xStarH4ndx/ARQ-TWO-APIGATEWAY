import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveUserFromHouseInput {
  @Field()
  houseId: string;

  @Field()
  userId: string;
}