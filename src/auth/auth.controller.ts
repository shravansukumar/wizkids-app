import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard.auth';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() request) {
        return request.user;
    }

}
