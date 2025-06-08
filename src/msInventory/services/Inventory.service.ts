import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CrearProductoInputDto } from '../dto/crearProductoInputDto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy,
  ) {}

  crearProducto(input: CrearProductoInputDto) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'crearProducto', body: input })
      .toPromise();
  }

  obtenerProducto(id: string) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'obtenerProducto', body: id })
      .toPromise();
  }

  saludar(nombre: string) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'saludar', body: nombre })
      .toPromise();
  }
}
