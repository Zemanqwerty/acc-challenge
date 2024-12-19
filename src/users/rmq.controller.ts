import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class RabbitmqController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('createUserFomTg') // Шаблон для обработки сообщений
  async handleTelegramMessage(data: any) {
    try {
      console.log('Received message from Telegram bot:', data);
      return await this.usersService.createUserfromTg(data);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}