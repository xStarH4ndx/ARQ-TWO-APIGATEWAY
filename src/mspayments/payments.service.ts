import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { GastoCompra } from "./models/GastoCompra.model";
import { CrearGastoServicioDTO } from "./dto/CrearGastoServicioDTO";
import { GastoServicio } from "./models/GastoServicio.model";

@Injectable()
export class PaymentService {
    constructor(
        @Inject('PAYMENTS_SERVICE') private readonly paymentClient: ClientProxy, // Cambia 'any' por el tipo adecuado si lo tienes definido
    ) {}

    listarGastoCompra(id: string): Promise<GastoCompra[]> {
        return this.paymentClient
            .send('mspayments.queue', { action: 'listarGastoCompra', body: id })
            .toPromise();
    }

    crearGastoServicio(input: CrearGastoServicioDTO) {
        return this.paymentClient
            .send('mspayments.queue', { action: 'crearGastoServicio', body: input })
            .toPromise();
    }

    listarGastoServicio(id: string): Promise<GastoServicio[]> {
        return this.paymentClient
            .send('mspayments.queue', { action: 'listarGastoServicioCasa', body: id })
            .toPromise();
    }
}