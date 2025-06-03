// apigateway/src/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryService } from './Inventory.service';
import { InventoryController } from './Inventory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
        },
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService], // Asegúrate de exportar el InventoryService
})
export class InventoryModule {}