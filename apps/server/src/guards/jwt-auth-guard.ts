import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtAuthGuard implements CanActivate {
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { authorization } = context.switchToHttp().getRequest().headers

        if (!authorization) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)  
        }

        const accessToken = authorization.split(' ')[1]
        
        if (!accessToken) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)  
        }

        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_TOKEN)
        } catch (e) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)   
        }
    }

}