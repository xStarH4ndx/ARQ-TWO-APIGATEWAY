import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CompraCreacionInput } from '../dto/compraCreacionInput';
import { CompraService } from '../services/Compra.service';
import { Compra } from '../models/compra.model';

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

  @Query(() => [Compra])
  async listarCompras(@Args('casaId') casaId: string): Promise<Compra[]> {
    return this.compraService.listarCompras(casaId);
  }



}

