import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqController } from './rmq.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`], // URL RabbitMQ
          queue: process.env.RMQ_TELEGRAM_QUEUE, // Очередь для микросервисов
          queueOptions: {
            durable: false, // Настройка очереди
          },
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController, RabbitmqController],
  exports: [UsersService]
})
export class UsersModule {}
