import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class VerifyEmailInput {
  @Field()
  email: string;

  @Field()
  code: string;
}