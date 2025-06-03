import { RmqOptions, Transport } from '@nestjs/microservices';

export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';

export function getRmqOptions(queue: string): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue,
      queueOptions: {
        durable: true,
      },
      exchange: 'apigateway.exchange',
      noAck: false,
    },
  };
}
