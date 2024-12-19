import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
      queue: process.env.RMQ_TELEGRAM_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  // Запуск HTTP-сервера и микросервиса
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 5010);
}
bootstrap();
