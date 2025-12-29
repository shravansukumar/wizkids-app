import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string) {

        const user = await this.userService.findByEmail(username)

        if (!user)
            throw new NotFoundException()

        const isValidUser = await bcrypt.compare(password, user.password)
        if (!isValidUser) {
            throw new UnauthorizedException()
        }

        return user
    }

    loginWithJwt(user) {
        const payload = {
            name: user.username,
            sub: user.id
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
