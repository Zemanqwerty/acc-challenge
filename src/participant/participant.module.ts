import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { UsersModule } from 'src/users/users.module';
import { EventModule } from 'src/event/event.module';
import { Participants } from './participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ParticipantService],
  controllers: [ParticipantController],
  imports: [UsersModule, EventModule, TypeOrmModule.forFeature([Participants])]
})
export class ParticipantModule {}
