import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}