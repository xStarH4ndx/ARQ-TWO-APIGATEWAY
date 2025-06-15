import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['houses', 'users', 'auth'],
          protoPath: [
            join(__dirname, '../../proto/houses.proto'),
            join(__dirname, '../../proto/users.proto'),
            join(__dirname, '../../proto/auth.proto'),
          ],
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GrpcClientsModule {}
