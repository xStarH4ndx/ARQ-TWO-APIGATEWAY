import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './userts.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [],
  controllers: [UsersResolver],
  providers: [UsersService],
})
export class UsersModule {}