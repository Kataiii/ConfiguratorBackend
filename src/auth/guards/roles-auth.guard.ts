import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {Reflector} from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "./decorators/roles-auth.decorator";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

export class RolesAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService,
        private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if(!requiredRoles){
                return true;
            }

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const account = this.jwtService.verify(token);
            req.account = account;
            return account.roles.some(role => requiredRoles.includes(role.name));
        } catch(e){
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}