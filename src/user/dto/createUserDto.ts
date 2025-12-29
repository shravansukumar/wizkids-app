import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    role: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string

}