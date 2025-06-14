import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { AchivementsService } from './achievements.service';
import { AchievementMemberDto } from './dto/achievement-member.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Request } from 'express';

@Controller('achievements')
export class AchivementsController {
  constructor(private readonly achivementsService: AchivementsService) {}

  @Post()
  create(@Body() createAchivementDto: CreateAchievementDto) {
    return this.achivementsService.create(createAchivementDto);
  }

  @Post('/addAchivement')
  addAchivement(@Body() achievementMemberDto: AchievementMemberDto) {
    const { username, achivementId } = achievementMemberDto;
    return this.achivementsService.addAchievement(username, achivementId);
  }

  @Get()
  findAll() {
    return this.achivementsService.findAll();
  }

  @Get("/myAchievements")
  getMyAchievements(@Req() req : Request) {
    return this.achivementsService.getMyAchievements(req.user!.username);
  }

  @Get("/genericAchievements")
  getGenericAchievements(@Req() req : Request) {
    return this.achivementsService.getGenericAchievements(req.user!.username);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.achivementsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) achivementId: number,
    @Body() updateAchivementDto: UpdateAchievementDto,
  ) {
    return this.achivementsService.update(achivementId, updateAchivementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) achivementId: number) {
    return this.achivementsService.remove(achivementId);
  }
}
