import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class OptionalJwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(user) {

        return user ?? null
    }

}