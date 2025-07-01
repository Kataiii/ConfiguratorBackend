import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("token");
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Здесь вы можете добавить логику проверки токена
    // Например, сохранение токена в req.user

    next();
  }
}