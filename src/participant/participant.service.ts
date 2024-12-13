import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participants } from './participant.entity';
import { CreateParticipant } from 'src/dto/participants/createParticipant.dto';
import { UsersService } from 'src/users/users.service';
import { EventService } from 'src/event/event.service';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participants)
        private participantsRepository: Repository<Participants>,

        private usersService: UsersService,

        private eventsService: EventService,
    ) {};

    async createParticipants(participantData: CreateParticipant) {
        const user = await this.usersService.getUserByTgId(participantData.user_tg_id);
        const event = await this.eventsService.getEventById(participantData.event_id);

        const new_participant = this.participantsRepository.create({
            user: user,
            event: event,
        });

        return await this.participantsRepository.save(new_participant);
    }

    async getAllParticipantsForEventById(event_id: string) {
        return await this.participantsRepository.find({
            relations: {
                user: true,
                event: true,
            },
            where: {
                event: {
                    id: event_id
                }
            }
        });
    }
}
