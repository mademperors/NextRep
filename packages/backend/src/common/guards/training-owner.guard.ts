import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TrainingsService } from 'src/repositories/trainings/services/training.service';

@Injectable()
export class TrainingOwnerGuard implements CanActivate {
  constructor(private readonly trainingService: TrainingsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const user = req.user as { username: string };
    const id = +req.params['id'];

    const creatorUsername = await this.trainingService.getTrainingCreatorUsername(id);
    return creatorUsername === user.username;
  }
}
