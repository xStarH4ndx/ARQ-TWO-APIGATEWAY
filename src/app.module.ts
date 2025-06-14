import { Module } from '@nestjs/common';
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
  ],
})
export class AppModule {}