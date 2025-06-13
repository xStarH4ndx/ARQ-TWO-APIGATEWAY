import { Field, ObjectType, ID } from "@nestjs/graphql";
import { ItemCompra } from "src/msInventory/models/itemCompra.model";

@ObjectType()
export class GastoCompra {
    @Field(() => ID)
    id: string;

    @Field()
    compraId: string;

    @Field(() => [ItemCompra])
    itemsCompra: ItemCompra[];

    @Field()
    valorTotalCompartido: number;

    @Field()
    valorTotalIndividual: number;
}