import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { LlmModuleService } from './llm-module.service';
@Controller('llm')
export class LlmModuleController {
  constructor(private readonly llmModuleService: LlmModuleService) {}

  @Get()
  findAll(@Body() memberData: JSON, @Req() req) {
    return this.llmModuleService.getResponce(req.user.email);
  }
}
