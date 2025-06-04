// apigateway/src/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryService } from '../services/Inventory.service';
import { InventoryResolver } from '../resolver/Inventory.resolver';
import { RmqModule } from 'src/rmq/rmq.module';

@Module({
  imports: [
    RmqModule.register('msinventory.queue'),
  ],
  providers: [InventoryService, InventoryResolver],
  exports: [InventoryService], // Asegúrate de exportar el InventoryService
})
export class InventoryModule {}