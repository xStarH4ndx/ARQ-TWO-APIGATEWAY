import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Inventario {
  @Field()
  casaId: string;

  @Field()
  productoId: string;

  @Field()
  nombreProducto: string;

  @Field(() => Int)
  cantidadStock: number;
}