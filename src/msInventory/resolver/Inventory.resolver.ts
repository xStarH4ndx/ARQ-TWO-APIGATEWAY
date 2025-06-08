import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryService } from '../services/Inventory.service';
import { Producto } from '../models/producto.model';
import { CrearProductoInputDto } from '../dto/crearProductoInputDto';

@Resolver(() => Producto)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => String)
  async crearProducto(@Args('input') input: CrearProductoInputDto): Promise<string> {
    await this.inventoryService.crearProducto(input);
    return 'Producto enviado correctamente.';
  }

  @Query(() => Producto, { name: 'obtenerProducto' })
  async obtenerProducto(@Args('id') id: string): Promise<Producto> {
    return this.inventoryService.obtenerProducto(id);
  }

  @Query(() => String)
  saludar(@Args('nombre') nombre: string) {
    return this.inventoryService.saludar(nombre);
  }

}
