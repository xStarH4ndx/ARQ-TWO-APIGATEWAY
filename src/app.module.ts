// apigateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { InventoryModule } from './msInventory/Inventory.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'api_to_inventory_queue',
          queueOptions: { durable: false },
        },
      }]),
    InventoryModule, // Importa el módulo aquí
  ],
  providers: [UserResolver, UserService],
  // No necesitas exportar 'INVENTORY_SERVICE' desde AppModule si lo exportas desde InventoryModule
  // exports: ['INVENTORY_SERVICE'],
})
export class AppModule {}