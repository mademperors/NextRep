import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ChallengesService } from 'src/repositories/challenges/services/challenges.service';

@Injectable()
export class ChallengeOwnerGuard implements CanActivate {
  constructor(private readonly challengeService: ChallengesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const user = req.user as { username: string };
    const id = +req.params['id'];

    const creatorUsername = await this.challengeService.getChallengeCreatorUsername(id);
    return creatorUsername === user.username;
  }
}
