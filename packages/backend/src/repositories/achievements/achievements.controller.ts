import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AchivementsService } from './achievements.service';
import { AchievementMemberDto } from './dto/achievement-member.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

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
