import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class AccountOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const user = req.user!;

    const paramValue = req.params['username'];
    if (user.username !== paramValue) return false;

    return true;
  }
}
