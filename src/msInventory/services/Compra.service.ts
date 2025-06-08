import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompraCreacionInput } from '../dto/compraCreacionInput';

@Injectable()
export class CompraService {
  constructor(@Inject("INVENTORY_SERVICE") private readonly inventoryClient: ClientProxy) {}

  crearCompra(input: CompraCreacionInput) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'crearCompra', body: input })
      .toPromise();
  }

  listarCompras(id: string) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'listarCompras', body: id })
      .toPromise();
  }

  eliminarCompra(id: string) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'eliminarCompra', body: id })
      .toPromise();
  }

  listarInventario(id: string) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'listarInventario', body: id })
      .toPromise();
  }
}