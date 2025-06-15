import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { InventoryModule } from './msInventory/modules/Inventory.module';
import { CompraModule } from './msInventory/modules/compra.module';
import { PaymentModule } from './mspayments/payments.module';
import { HousesModule } from './houses/houses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { GrpcClientsModule } from './config/grpc-clients.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    GrpcClientsModule, // Aquí importa tu módulo con los clientes GRPC

    HousesModule,
    UsersModule,
    AuthModule,
    InventoryModule,
    CompraModule,
    PaymentModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
