import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get()
    users() {
        // Get all users from db
    }

    @Post()
    create() {
        // Create user and store into db
    }

    @Delete()
    deleteUser() {
        // Delete user from db
    }

    @Patch()
    updateUser() {
        // Update user
    }

}
