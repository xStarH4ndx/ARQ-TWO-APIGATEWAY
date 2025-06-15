import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  controllers: [AuthResolver],
  providers: [AuthService],
})
export class AuthModule {}