import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenPayload {
  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  iat: number;

  @Field()
  exp: number;
}