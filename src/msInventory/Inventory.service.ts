// inventory.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InventoryService {
  constructor(@Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy) {}

  async crearProducto(producto: any) {
    return this.inventoryClient.send('crear.producto', producto).toPromise();
  }

  async obtenerProducto(id: string) {
    return this.inventoryClient.send('obtener.producto', id).toPromise();
  }

  // ... otros métodos para interactuar con MS-INVENTORY
}