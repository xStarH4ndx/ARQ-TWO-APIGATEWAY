import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './userts.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}