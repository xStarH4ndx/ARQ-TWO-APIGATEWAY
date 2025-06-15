import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddUserToHouseInput {
  @Field()
  houseId: string;

  @Field()
  userId: string;
}