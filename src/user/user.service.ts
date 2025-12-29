import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from './dto/createUserDto'
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

    async users() {
        const users = await this.userRepo.find()
        return users
    }

    async findByEmail(email: string) {
        return await this.userRepo.findOne({
            where: { email:email },
        });
    }

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepo.create(createUserDto)
        return await this.userRepo.save(user)
    }

    async update(id,updateUserDto: UpdateUserDto) {
        const user = await this.userRepo.findOne({
            where: { id:id },
          });
        if (!user)
            throw new NotFoundException()

        Object.assign(user, updateUserDto);
        return await this.userRepo.save(user)
    }

    async delete(id:string) {
        const user = await this.userRepo.findOne({
            where: { id:id },
          });

        if (!user)
            throw new NotFoundException()
        return this.userRepo.delete(id)
    }
}
