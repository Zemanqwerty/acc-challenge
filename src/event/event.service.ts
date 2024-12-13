import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Events } from './event.entity';
import { CreateEvent } from 'src/dto/events/createEvent.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Events)
        private eventRepository: Repository<Events>,
    ) {};

    async createEvent(eventData: CreateEvent) {
        const newEvent = this.eventRepository.create(eventData);

        return await this.eventRepository.save(newEvent);
    }

    async getEventById(id: string) {
        return await this.eventRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getLastEvents() {
        return await this.eventRepository.find({
            order: {
                startTime: 'DESC'
            },
            take: 10
        });
    }

    async getEndedEvents() {
        const currentDateTime = new Date();
        
        return await this.eventRepository.find({
            where: {
                startTime: LessThan(currentDateTime)
            },
            order: {
                startTime: 'DESC'
            }
        });
    }
}
