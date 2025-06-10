import { Body, Controller, Get, Req } from '@nestjs/common';
import { LlmModuleService } from './llm-module.service';
import { Request } from 'express';
@Controller('llm')
export class LlmModuleController {
  constructor(private readonly llmModuleService: LlmModuleService) {}

  @Get('recommendation')
  getRecommendation(@Body() memberData: JSON, @Req() req) {
      return this.llmModuleService.getRecommendation(req.user.email);
    }
}
