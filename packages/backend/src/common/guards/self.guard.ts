import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const user = req.user;

    const paramValue = req.params['email'];

    if (!user || !paramValue || user.email !== paramValue) {
      throw new ForbiddenException('You can only access your own data');
    }

    return true;
  }
}
