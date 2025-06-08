import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ItemCompra {
  @Field()
  productoId: string;

  @Field()
  nombreProducto: string;

  @Field(() => Float)
  cantidad: number;

  @Field(() => Float)
  precioUnitario: number;

  @Field()
  esCompartido: boolean;

  @Field({ nullable: true })
  propietarioId?: string;
}