import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHouseInput {
  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  codigo: string;

  @Field(() => [String])
  userIds: string[];
}