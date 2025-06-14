import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PaymentService } from "./payments.service";
import { PaymentResolver } from "./payments.resolver";


@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PAYMENTS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'mspayments.queue',  // Solo cola directa
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    providers: [PaymentService, PaymentResolver],
    exports: [PaymentService],
})
export class PaymentModule {}