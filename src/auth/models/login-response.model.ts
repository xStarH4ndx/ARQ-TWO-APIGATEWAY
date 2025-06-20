import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class LoginData {
  @Field()
  accessToken: string; 

  @Field(() => User)
  user: User;
}

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => LoginData, { nullable: true })
  data?: LoginData;
}