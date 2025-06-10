import { Body, Controller, Get, Param } from '@nestjs/common';
import { LlmModuleService } from './llm-module.service';
@Controller('llm')
export class LlmModuleController {
  constructor(private readonly llmModuleService: LlmModuleService) {}

  @Get()
  findAll(@Body() memberData: JSON) {
    return this.llmModuleService.getResponce(memberData);
  }
}
