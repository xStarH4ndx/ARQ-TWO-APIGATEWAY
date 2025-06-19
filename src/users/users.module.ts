import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GrpcClientsModule } from 'src/config/grpc-clients.module';

@Module({
  imports: [GrpcClientsModule],
  providers: [UsersService,UsersResolver],
})
export class UsersModule {}