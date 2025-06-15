import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InventoryModule } from './msInventory/modules/Inventory.module';
import { AppResolver } from './app.resolver';
import { CompraModule } from './msInventory/modules/compra.module';
import { PaymentModule } from './mspayments/payments.module';
import { ConfigModule } from '@nestjs/config'; // <--- IMPORTADO
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HousesModule } from './houses/houses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['houses', 'users', 'auth'],
          protoPath: [
            join(__dirname, '../proto/houses.proto'),
            join(__dirname, '../proto/users.proto'),
            join(__dirname, '../proto/auth.proto'),
          ],
          url: 'localhost:5001',
        },
      },
    ]),
    HousesModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), // <--- AÑADIDO
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    InventoryModule,
    CompraModule,
    PaymentModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
