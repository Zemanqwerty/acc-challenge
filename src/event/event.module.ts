import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Events } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService]
})
export class EventModule {}
