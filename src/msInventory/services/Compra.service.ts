import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../../rmq/rmq.config';
import { CompraCreacionInput } from '../dto/compraCreacionInput';

@Injectable()
export class CompraService {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  async crearCompra(compra: CompraCreacionInput): Promise<string> {
    this.client.emit('compra.create', compra);
    return 'Compra enviada exitosamente';
  }
}
