import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MembersRepository } from '../members/member.repository';
import { mealRecommendationExamples } from './prompts/meal-recomendation-examples';
import { ResponseMemberDto } from '../members/dtos/response-member.dto';
import { Gender } from 'src/common/constants/enums/gender.enum';
import { Member } from 'src/database/entities/member.entity';

@Injectable()
export class LlmModuleService {
  constructor(private readonly memberRepository: MembersRepository) {}

  async getResponce(email: any) {
    const model = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const member = await this.memberRepository.findOne({ email: email });

    const memberChallenges = []; // TODO: call member_challenge repo method to get challenges of member
    
    const messages = [
      new SystemMessage(
        'Using json that is provided (user physical parameters and challenges he is currently in), generate daily recommedations for the user about his nutrition. Dont write code, just write the text that user can read. Use the data from the json to generate the recommendations. Write general recommendations, not specific ones. Write only key recommendations',
      ),
      ...mealRecommendationExamples.map((ex) => [ex.input, ex.output]).flat(),
      new HumanMessage(`User data: ${JSON.stringify(member)}
      Current Challenges: ${JSON.stringify(memberChallenges)}`),
    ];

    const responce = await model.invoke(messages);
    return responce.text;
  }
}
