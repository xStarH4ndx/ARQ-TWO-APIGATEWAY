import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CompraCreacionInput } from '../dto/compraCreacionInput';
import { CompraService } from '../services/Compra.service';
import { Compra } from '../models/compra.model';
import { Inventario } from '../models/itemInventario.model';

@Resolver()
export class CompraResolver {
  constructor(private readonly compraService: CompraService) {}

  @Mutation(() => String)
  async crearCompra(@Args('compra') compra: CompraCreacionInput): Promise<string> {
    return this.compraService.crearCompra(compra);
  }

  @Mutation(() => String)
  async eliminarCompra(@Args('id') id: string): Promise<string> {
    return this.compraService.eliminarCompra(id);
  }

  @Mutation(() => Inventario)
  async actualizarInventario(@Args('id') id: string, @Args('cantidad') cantidad: number): Promise<Inventario> {
    return this.compraService.actualizarInventario(id, cantidad);
  }

  @Query(() => [Compra])
  async listarCompras(@Args('casaId') casaId: string): Promise<Compra[]> {
    return this.compraService.listarCompras(casaId);
  }

  @Query(() => [Inventario])
  async listarInventario(@Args('casaId') casaId: string): Promise<Inventario[]> {
    return this.compraService.listarInventario(casaId);
  }

}

