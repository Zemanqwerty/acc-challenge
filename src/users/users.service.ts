import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from 'src/dto/users/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {};

    async createUsers(userData: CreateUser) {
        const newUser = this.usersRepository.create(userData);
        return await this.usersRepository.save(newUser);
    }

    async getUserById(id: string) {
        return await this.usersRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getUserByTgId(tgId: string) {
        return await this.usersRepository.findOne({
            where: {
                telegram_id: tgId
            }
        });
    }

    async getAllUsers() {
        return await this.usersRepository.find();
    }
}
