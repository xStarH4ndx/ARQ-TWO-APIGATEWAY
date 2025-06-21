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
                    urls: ['amqps://wfkwwege:UwGEdBBlBLq2Rex4f0xdN_Xhq-PuBq8s@gull.rmq.cloudamqp.com/wfkwwege'],
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