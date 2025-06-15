import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SuccessResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}