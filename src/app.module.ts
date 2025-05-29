import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

// import { UserModule } from './user/user.module';
// import { InventoryModule } from './inventory/inventory.module';
// import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // Cliente gRPC para msUsers
    ClientsModule.register([
      // {
      //   name: 'USER_PACKAGE',
      //   transport: Transport.GRPC,
      //   options: {
      //     package: 'user',
      //     protoPath: join(__dirname, '../proto/user.proto'),
      //     url: 'localhost:50051',
      //   },
      // },
      // Cliente RabbitMQ para msInventory
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'api_to_inventory_queue',
          queueOptions: { durable: false },
        },
      },
      // // Cliente RabbitMQ para msPayments
      // {
      //   name: 'PAYMENT_SERVICE',
      //   transport: Transport.RMQ,
      //   options: {
      //     urls: ['amqp://localhost:5672'],
      //     queue: 'payment_queue',
      //     queueOptions: { durable: false },
      //   },
      // },
    ]),
    // UserModule,
    // InventoryModule,
    // PaymentModule,
  ],
  exports: ['INVENTORY_SERVICE'],
})
export class AppModule {}
