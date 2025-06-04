import { Module } from '@nestjs/common';
import { CompraResolver } from '../resolver/Compra.resolver';
import { RmqModule } from 'src/rmq/rmq.module';
import { CompraService } from '../services/Compra.service';

@Module({
  imports: [RmqModule.register('msinventory.queue')],
  providers: [CompraResolver, CompraService],
})
export class CompraModule {}
