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

    async createUserfromTg(data: any) {
        console.log(data);
        const user = await this.usersRepository.findOne({
            where: {
                telegram_id: data.telegram_id
            }
        })
        
        console.log(user);

        if (user) {
            console.log('user!!!');
            return 
        }

        const newUser = this.usersRepository.create({
            telegram_id: data.telegram_id,
            telegram_username: data.telegram_username
        });
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
        console.log('get users');
        return await this.usersRepository.find();
    }

    async deleteUserByTgId(id: string) {
        console.log(id);
        const users = await this.usersRepository.find({
            where: {
                id: id
            }
        })
        
        await Promise.all(users.map(async (user) => {
            await this.usersRepository.delete(user);
        }));
    }
}
