import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { HousesResolver } from './houses.resolver';
import { GrpcClientsModule } from 'src/config/grpc-clients.module';

@Module({
  imports: [GrpcClientsModule],
  providers: [HousesService,HousesResolver],
})
export class HousesModule {}