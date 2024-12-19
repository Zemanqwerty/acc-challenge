import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from 'src/dto/users/createUser.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {};

    @Post('')
    async createUser(@Body() userData: CreateUser) {
        try {
            return await this.usersService.createUsers(userData);
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get('')
    async getAllUsers() {
        try {
            return await this.usersService.getAllUsers();
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get(':tgid')
    async getUserById(@Param() param: any) {
        try {
            return await this.usersService.getUserByTgId(param.tgid);
        } catch (e) {
            console.log(e);
            return(e)
        }
    }

    @Delete(':tgid')
    async deleteUserByTgId(@Param() param: any) {
        try {
            return await this.usersService.deleteUserByTgId(param.tgid);
        } catch (e) {
            console.log(e);
            return e
        }
    }
}
