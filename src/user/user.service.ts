import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from './dto/createUserDto'
import { UpdateUserDto } from './dto/updateUserDto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/responseUserDto';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

    async users(user) {
        const users = await this.userRepo.find({
            where: {isFired:false}
        })

        return this.filterUserFields(users,user)
    }

    filterUserFields(users: User[], user?: User) {
        return plainToInstance(UserResponseDto, users, {
          groups: user ? ['user'] : [],
        });
      }

    async findByEmail(email: string) {
        return await this.userRepo.findOne({
            where: { email:email },
            select: ['id','password','email','phoneNumber']
        });
    }

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepo.create(createUserDto)
        return await this.userRepo.save(user)
    }

    async update(id:string,updateUserDto: UpdateUserDto) {
        const user = await this.userRepo.findOne({
            where: { id:id },
          });
        if (!user)
            throw new NotFoundException()

        Object.assign(user, updateUserDto);
        return await this.userRepo.save(user)
    }

    async fireUnFire(id:string, userId: string, fire: boolean) {
         // To avoid self firing
         if (id === userId)
            throw new HttpException('You cannot fire yourself', HttpStatus.FORBIDDEN);

        const user = await this.userRepo.findOne({
            where: { id:id },
          });
        if (!user)
            throw new NotFoundException()
        user.isFired = fire
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
