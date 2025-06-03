import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE, getRmqOptions } from './rmq.config';

@Module({})
export class RmqModule {
  static register(queue: string): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.register([
          {
            name: RABBITMQ_SERVICE,
            ...getRmqOptions(queue),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
