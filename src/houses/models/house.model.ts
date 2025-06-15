import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class House {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  codigo: string;

  @Field(() => [String])
  userIds: string[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}