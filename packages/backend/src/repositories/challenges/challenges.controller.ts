import { Controller } from '@nestjs/common';
import { ChallengesAuxRepository } from './services/challenges-aux.repository';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesAuxRepository: ChallengesAuxRepository) {}

  // // // READ
  // @Get('created')
  // getCreatedChallenges(@Req() req: Request) {
  //   return this.challengesAuxRepository.getCreatedChallenges(req.user!.email);
  // }

  // // GET /challenges/me
  // @Get('me')
  // getEnrolledChallenges(@Req() req: Request) {
  //   return this.challengesAuxRepository.getEnrolledChallenges(req.user!.email);
  // }

  // // GET /challenges/global
  // @Get('global')
  // getGlobalChallenges() {
  //   return this.challengesAuxRepository.getGlobalChallenges();
  // }

  // // GET /challenges/:id
  // @Get(':id')
  // getChallengeById(@Param('id', ParseIntPipe) id: number) {
  //   return this.challengesAuxRepository.getChallengeById(id);
  // }

  // // GET /challenge/:id/enrolled
  // @Get(':id/enrolled')
  // getChallengeEnrolled(@Param('id', ParseIntPipe) id: number) {
  //   return this.challengesAuxRepository.getEnrolledMembers(id);
  // }

  // // GET /challenge/:id/trainings
  // @Get(':id/trainings')
  // getChallengeTrainings(@Param('id', ParseIntPipe) id: number) {
  //   return this.challengesAuxRepository.getChallengeTrainings(id);
  // }

  // // POST /challenges
  // @Post()
  // createChallenge(@Body() dto: CreateChallengeDto, @Req() req: Request) {
  //   return this.challengesAuxRepository.createChallenge(dto, req.user);
  // }

  // // PATCH /challenges
  // @Patch()
  // updateChallenge(@Body() dto: UpdateChallengeDto, @Req() req: Request) {
  //   return this.challengesAuxRepository.updateChallenge(dto, req.user);
  // }

  // // PATCH /challenges/:id/enroll
  // @Patch(':id/enroll')
  // enrollInChallenge(@Param('id') id: number, @Req() req: Request) {
  //   return this.challengesAuxRepository.enrollInChallenge(id, req.user!.email);
  // }

  // // DELETE /challenges/:id
  // @Delete(':id')
  // deleteChallenge(@Param('id') id: number, @Req() req: Request) {
  //   return this.challengesAuxRepository.deleteChallenge(id, req.user);
  // }
}
