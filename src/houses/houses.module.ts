import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { HousesResolver } from './houses.resolver';

@Module({
  controllers: [HousesResolver],
  providers: [HousesService],
})
export class HousesModule {}