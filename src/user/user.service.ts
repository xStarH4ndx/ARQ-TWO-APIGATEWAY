import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UserServiceGrpc {
  getUser(data: { id: string }): Observable<{ id: string; name: string; email: string }>;
}

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceGrpc: UserServiceGrpc;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceGrpc = this.client.getService<UserServiceGrpc>('UserService');
  }

  getUser(id: string) {
    return this.userServiceGrpc.getUser({ id });
  }
}
