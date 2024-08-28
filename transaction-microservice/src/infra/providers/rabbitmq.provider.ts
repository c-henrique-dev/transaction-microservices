import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQClientInterface } from "../../domain/interfaces/rabbitmq.interface";

export class RabbitMQClientProvider implements RabbitMQClientInterface {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE_REQUEST,
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async sendMessage(pattern: any, data: any): Promise<any> {
    return this.client.send(pattern, data).toPromise();
  }
}
