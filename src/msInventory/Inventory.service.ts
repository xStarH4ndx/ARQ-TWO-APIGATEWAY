import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Producto } from './models/producto.model';
import { CrearProductoInputDto } from './dto/crearProductoInputDto';
import { RABBITMQ_SERVICE } from '../rmq/rmq.config';

@Injectable()
export class InventoryService {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly inventoryClient: ClientProxy) {}

  async crearProducto(input: CrearProductoInputDto) {
    // Convertimos el input DTO a Producto asegurando que descripcion no sea undefined
    const producto: Producto = {
      id: '', // o undefined/null si el id se genera en el microservicio
      nombre: input.nombre,
      categoria: input.categoria,
      descripcion: input.descripcion ?? '',  // Si descripcion es undefined, asigna string vacío
    };

    // Enviamos el producto al microservicio con el patrón correcto
    return this.inventoryClient.emit('inventory.create', producto).toPromise();
  }

  async obtenerProducto(id: string) {
    return this.inventoryClient.send('inventory.get', id).toPromise();
  }

  // ... otros métodos
}
