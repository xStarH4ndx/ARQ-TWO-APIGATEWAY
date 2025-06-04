import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CompraCreacionInput } from '../dto/compraCreacionInput';
import { CompraService } from '../services/Compra.service';

@Resolver()
export class CompraResolver {
  constructor(private readonly compraService: CompraService) {}

  @Mutation(() => String)
  async crearCompra(@Args('compra') compra: CompraCreacionInput): Promise<string> {
    return this.compraService.crearCompra(compra);
  }
}

