// apigateway/src/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompraService } from '../services/Compra.service';
import { CompraResolver } from '../resolver/Compra.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          exchange: 'apigateway.exchange', // solo exchange, sin queue
        },
      },
    ]),
  ],
  providers: [CompraService, CompraResolver],
  exports: [CompraService],
})
export class CompraModule {}
