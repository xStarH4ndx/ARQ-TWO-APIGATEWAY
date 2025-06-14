import { Field, ObjectType, ID } from "@nestjs/graphql";
import { ItemCompra } from "src/msInventory/models/itemCompra.model";

@ObjectType()
export class GastoCompra {
    @Field(() => ID)
    id: string;

    @Field()
    compraId: string;

    @Field()
    descripcion: string;

    @Field(() => [ItemCompra])
    itemsCompra: ItemCompra[];

    @Field(() => Date)
    fechaRegistro: Date;

    @Field()
    valorTotalCompartido: number;

    @Field()
    valorTotalIndividual: number;
}