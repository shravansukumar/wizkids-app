import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class OptionalJwtAuthGuard extends AuthGuard('jwt') {

    // Although all params are not used, it is needed, inorder to set the user value properly. Learnt it the hard way.
    handleRequest(err, user, info, context, status) {
        
        return user ?? null
    }

}