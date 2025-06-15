import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateHouseInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  codigo?: string;

  @Field(() => [String], { nullable: true })
  userIds?: string[];
}