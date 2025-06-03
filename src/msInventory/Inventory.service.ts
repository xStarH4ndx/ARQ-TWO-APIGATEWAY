import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface Producto {
  nombre: string;
  categoria: string;
  descripcion: string;
}

@Injectable()
export class InventoryService {
  constructor(@Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy) {}

  async crearProducto(producto: Producto) {
    // La primera cadena es el patrón/routing key. Debe coincidir con el Binding en MS-INVENTORY.
    return this.inventoryClient.send('inventory.create', producto).toPromise();
  }

  async obtenerProducto(id: string) {
    // La primera cadena es el patrón/routing key. Debe coincidir con el Binding en MS-INVENTORY.
    return this.inventoryClient.send('inventory.get', id).toPromise();
  }

  // ... otros métodos para interactuar con MS-INVENTORY
}