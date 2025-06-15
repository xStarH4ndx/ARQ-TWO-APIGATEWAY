import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { GrpcClientsModule } from 'src/config/grpc-clients.module';

@Module({
  imports: [GrpcClientsModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}