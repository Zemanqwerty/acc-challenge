import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEvent } from 'src/dto/events/createEvent.dto';

@Controller('event')
export class EventController {
    constructor (private readonly eventService: EventService) {};

    @Post('')
    async createEvent(@Body() eventData: CreateEvent) {
        try {
            return await this.eventService.createEvent(eventData);
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get('')
    async getLastEvents() {
        try {
            return await this.eventService.getLastEvents();
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get('ended')
    async getEndedEvents() {
        try {
            return await this.eventService.getEndedEvents();
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get(':id')
    async getEventById(@Param() params: any) {
        try {
            return await this.eventService.getEventById(params.id);
        } catch (e) {
            console.log(e);
            return e
        }
    }
}
