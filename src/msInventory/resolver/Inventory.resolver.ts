import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryService } from '../services/Inventory.service';
import { Producto } from '../models/producto.model';
import { CrearProductoInputDto } from '../dto/crearProductoInputDto';

@Resolver()
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => String)
  async crearProducto(@Args('input') input: CrearProductoInputDto): Promise<string> {
    const res = await this.inventoryService.crearProducto(input);
    return 'Producto enviado correctamente: id: '+ res;
  }

  @Mutation(() => String)
  async eliminarProducto(@Args('id') id: string): Promise<string> {
    return this.inventoryService.eliminarProducto(id);
  }

  @Query(() => Producto)
  async obtenerProducto(@Args('id') id: string): Promise<Producto> {
    return this.inventoryService.obtenerProducto(id);
  }

  @Query(() => [Producto])
  async listarProductos(): Promise<Producto[]> {
    return this.inventoryService.listarProductos();
  }

}
