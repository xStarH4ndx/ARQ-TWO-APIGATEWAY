import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CrearProductoInputDto } from '../dto/crearProductoInputDto';
import { Producto } from '../models/producto.model';

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

  listarProductos(): Promise<Producto[]> {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'listarProductos', body: {}})
      .toPromise();
  }

  eliminarProducto(id: string) {
    return this.inventoryClient
      .send('msinventory.queue', { action: 'eliminarProducto', body: id })
      .toPromise();
  }

}
