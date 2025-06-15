import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  authId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}