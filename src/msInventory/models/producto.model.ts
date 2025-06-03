import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Producto {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  categoria: string;

  @Field({ nullable: true }) // porque la descripción puede ser opcional
  descripcion?: string;
}
