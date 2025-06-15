import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { PaymentService } from "./payments.service";
import { CrearGastoServicioDTO } from "./dto/CrearGastoServicioDTO";
import { GastoServicio } from "./models/GastoServicio.model";
import { GastoCompra } from "./models/GastoCompra.model";

@Resolver()
export class PaymentResolver {
    constructor(private readonly paymentService: PaymentService) {}

    @Mutation(() => String)
    async crearGastoServicio(@Args('input') input: CrearGastoServicioDTO): Promise<string> {
        return this.paymentService.crearGastoServicio(input);
    }

    @Query(() => [GastoServicio])
    async listarGastoServicio(@Args('casaId') casaId: string): Promise<GastoServicio[]> {
        return this.paymentService.listarGastoServicio(casaId);
    }

    @Query(() => [GastoCompra])
    async listarGastoCompra(@Args('casaId') casaId: string): Promise<GastoCompra[]> {
        return this.paymentService.listarGastoCompra(casaId);
    }
}