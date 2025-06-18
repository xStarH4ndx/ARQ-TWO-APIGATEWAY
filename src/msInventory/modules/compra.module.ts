import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompraService } from '../services/Compra.service';
import { CompraResolver } from '../resolver/Compra.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://wfkwwege:MXhjPUXvCp_hdMeVg_16cIXLW0Hta4rc@gull.rmq.cloudamqp.com/wfkwwege'],
          queue: 'msinventory.queue',  // Solo cola directa
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [CompraService, CompraResolver],
  exports: [CompraService],
})
export class CompraModule {}