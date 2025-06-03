import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryService } from './Inventory.service';
import { Producto } from './models/producto.model';
import { CrearProductoInputDto } from './dto/crearProductoInputDto';

@Resolver(() => Producto)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => Producto)
  async crearProducto(@Args('input') input: CrearProductoInputDto): Promise<Producto> {
    return this.inventoryService.crearProducto(input);
  }

  @Query(() => Producto, { name: 'obtenerProducto' })
  async obtenerProducto(@Args('id') id: string): Promise<Producto> {
    return this.inventoryService.obtenerProducto(id);
  }
}
