import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TrainingsService } from 'src/repositories/trainings/services/training.service';

@Injectable()
export class TrainingOwnerGuard implements CanActivate {
  constructor(private readonly trainingRepository: TrainingsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const user = req.user!;
    const id = +req.params['id'];

    const creatorUsername = await this.trainingRepository.getTrainingCreatorUsername(id);

    if (creatorUsername !== user.username) {
      throw new ForbiddenException(
        'You are not authorized to perform this action on this training',
      );
    }

    return true;
  }
}
