import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CompraService } from '../services/Compra.service';
import { CompraResolver } from '../resolver/Compra.resolver';

@Module({
  imports: [
    ConfigModule, // Asegura que puedes usar ConfigService

    ClientsModule.registerAsync([
      {
        name: 'INVENTORY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const uri = config.get<string>('RABBITMQ_URI');
          const queue = config.get<string>('RABBITMQ_INVENTORY_QUEUE');

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
  providers: [CompraService, CompraResolver],
  exports: [CompraService],
})
export class CompraModule {}
