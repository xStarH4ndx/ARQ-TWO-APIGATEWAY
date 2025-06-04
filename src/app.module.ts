import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InventoryModule } from './msInventory/modules/Inventory.module';
import { AppResolver } from './app.resolver';
import { CompraModule } from './msInventory/modules/compra.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Genera el esquema automáticamente
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    InventoryModule, // Importa el módulo aquí
    CompraModule
  ],
  providers: [AppResolver],
})
export class AppModule {}