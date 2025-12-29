import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    users() {
        // Get all users from db
        return this.userService.users()
    }

    @Post()
    create(@Body()createUserDto: CreateUserDto) {
        // Create user and store into db
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    updateUser(@Param(':id')id :string, @Body()updateUserDto: UpdateUserDto ) {
        // Update user
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id')id: string) {
        return this.userService.delete(id)
    }

}
