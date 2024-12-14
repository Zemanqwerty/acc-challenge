import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipant } from 'src/dto/participants/createParticipant.dto';

@Controller('participant')
export class ParticipantController {
    constructor (private readonly participantService: ParticipantService) {};

    @Post('')
    async createParticipant(@Body() participantData: CreateParticipant) {
        try {
            return await this.participantService.createParticipants(participantData)
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get(':id')
    async getParticipantByEventId(@Param() params: any) {
        try {
            return await this.participantService.getAllParticipantsForEventById(params.id);
        } catch (e) {
            console.log(e);
            return e
        }
    }
}
