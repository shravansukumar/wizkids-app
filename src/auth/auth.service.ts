import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, password: string) {
        
        const user = await this.userService.findByEmail(username)

        if (!user) 
            throw new NotFoundException()

        console.log ({
            user: user
        })
         const isValidUser = await bcrypt.compare(password,user.password)
        console.log(isValidUser)
         if(!isValidUser) {
            throw new UnauthorizedException()
         }

        return user
    }
}
