import { Get, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard.auth';
import { JwtAuthGuard } from './guard/jwt.guard.auth';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() request) {

        //return request.user;
       return this.authService.loginWithJwt(request.user);
    }


    @UseGuards(JwtAuthGuard)
    @Get('impEndPoint')
    getPro(@Request() request) {
        console.log("Hello from the other side")
        return request.user;
    }
}
