// apigateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { UserService } from './user/user.service';
// import { UserResolver } from './user/user.resolver';
import { InventoryModule } from './msInventory/Inventory.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Genera el esquema automáticamente
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    InventoryModule, // Importa el módulo aquí
  ],
  providers: [AppResolver],
})
export class AppModule {}