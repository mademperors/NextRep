import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TrainingsRepository } from 'src/repositories/trainings/training.repository';

@Injectable()
export class TrainingOwnerGuard implements CanActivate {
  constructor(private readonly trainingRepository: TrainingsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const user = req.user!;
    const challengeId = +req.params['id'];

    const creator = await this.trainingRepository.findCreator({ id: challengeId });

    if (creator.email !== user.email) {
      throw new ForbiddenException('You can only access your own challenges');
    }

    return true;
  }
}
