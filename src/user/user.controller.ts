import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard.auth';
import { OptionalJwtAuthGuard } from 'src/auth/guard/jwt.optional.guard.auth';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @UseGuards(OptionalJwtAuthGuard)
    users(@Request() request) {
        // Get all users from db
        //console.log(request.user)
        return this.userService.users(request.user)
    }

    @Post()
    create(@Body()createUserDto: CreateUserDto) {
        // Create user and store into db
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    updateUser(@Param('id')id :string, @Body()updateUserDto: UpdateUserDto ) {
        // Update user
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id')id: string) {
        return this.userService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('fire/:id')
    fire(@Param('id')id:string, @Request() request) {
        return this.userService.fireUnFire(id, request.user.id, true)
        // return this.userService.fire(id, request.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('unfire/:id')
    unFire(@Param('id')id:string, @Request() request) {
        // return this.userService.unFire(id, request.user.id)
        return this.userService.fireUnFire(id, request.user.id, false)
    }
}
