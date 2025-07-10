import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { PaymentService } from "./payments.service";
import { PaymentResolver } from "./payments.resolver";

@Module({
  imports: [
    ConfigModule, // habilita ConfigService

    ClientsModule.registerAsync([
      {
        name: 'PAYMENTS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const uri = config.get<string>('RABBITMQ_URI');
          const queue = config.get<string>('RABBITMQ_PAYMENTS_QUEUE');

          if (!uri) throw new Error('❌ RABBITMQ_URI no está definido');
          if (!queue) throw new Error('❌ RABBITMQ_PAYMENTS_QUEUE no está definido');

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
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
