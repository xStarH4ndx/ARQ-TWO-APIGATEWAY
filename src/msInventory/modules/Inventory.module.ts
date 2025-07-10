import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { InventoryService } from '../services/Inventory.service';
import { InventoryResolver } from '../resolver/Inventory.resolver';

@Module({
  imports: [
    // Importa ConfigModule (opcional si ya es global)
    ConfigModule,

    // Registra el microservicio con variables de entorno usando registerAsync
    ClientsModule.registerAsync([
      {
        name: 'INVENTORY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const uri = config.get<string>('RABBITMQ_URI');
          const queue = config.get<string>('RABBITMQ_INVENTORY_QUEUE');

          // Valida que existan
          if (!uri) throw new Error('❌ RABBITMQ_URI no está definido');
          if (!queue) throw new Error('❌ RABBITMQ_INVENTORY_QUEUE no está definido');

          return {
            transport: Transport.RMQ,
            options: {
              urls: [uri],
              queue,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [InventoryService, InventoryResolver],
  exports: [InventoryService],
})
export class InventoryModule {}
