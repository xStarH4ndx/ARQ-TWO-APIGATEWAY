import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InventoryService } from '../services/Inventory.service';
import { InventoryResolver } from '../resolver/Inventory.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://wfkwwege:UwGEdBBlBLq2Rex4f0xdN_Xhq-PuBq8s@gull.rmq.cloudamqp.com/wfkwwege'],
          queue: 'msinventory.queue',  // Solo cola directa
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [InventoryService, InventoryResolver],
  exports: [InventoryService],
})
export class InventoryModule {}
