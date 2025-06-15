import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateHouseInput {
  @Field()
  @IsNotEmpty()
  nombre: string;

  @Field()
  @IsNotEmpty()
  descripcion: string;

  @Field()
  @IsNotEmpty()
  codigo: string;

  @Field(() => [String])
  @IsNotEmpty()
  userIds: string[];
}