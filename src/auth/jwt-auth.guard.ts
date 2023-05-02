import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import {Reflector} from "@nestjs/core";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService,
        private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if(isPublic) return true;
        
        const req = context.switchToHttp().getRequest();
        try{
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const account = this.jwtService.verify(token);
            req.account = account;
            return true;
        } catch(e){
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
    
}
