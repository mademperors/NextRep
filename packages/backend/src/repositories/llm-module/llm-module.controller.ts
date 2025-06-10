import { Body, Controller, Get, Req } from '@nestjs/common';
import { LlmModuleService } from './llm-module.service';
@Controller('llm')
export class LlmModuleController {
  constructor(private readonly llmModuleService: LlmModuleService) {}

  @Get('recommendation')
  findAll(@Body() memberData: JSON, @Req() req) {
    return this.llmModuleService.getRecommendation(req.user.email);
  }
}
