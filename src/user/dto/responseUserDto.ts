import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseDto {

    @Expose()
    id: string

    @Expose()
    username: string

    @Expose()
    role: string

    @Expose({ groups: ['user'] })
    phoneNumber: string

    @Expose({ groups: ['user'] })
    email: string
}