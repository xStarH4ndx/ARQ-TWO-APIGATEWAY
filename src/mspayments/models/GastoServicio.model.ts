import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class GastoServicio {
    @Field()
    casaId: string;

    @Field()
    descripcion: string;

    @Field()
    valorTotal: number;

    @Field(() => Date)
    fechaRenovacion: Date;
}