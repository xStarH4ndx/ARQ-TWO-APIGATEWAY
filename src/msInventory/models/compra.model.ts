import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ItemCompra } from './itemCompra.model'; // Asegúrate de importar ItemCompra

@ObjectType()
export class Compra {
  @Field(() => ID)
  id: string;

  @Field()
  casaId: string;

  @Field() 
  fechaCompra: string; 

  @Field(() => [ItemCompra])
  itemsCompra: ItemCompra[];
}