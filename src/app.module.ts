import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { InventoryModule } from './msInventory/modules/Inventory.module';
import { CompraModule } from './msInventory/modules/compra.module';
import { PaymentModule } from './mspayments/payments.module';

import { ConfigModule } from '@nestjs/config';
import { AppResolver } from './app.resolver';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

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
