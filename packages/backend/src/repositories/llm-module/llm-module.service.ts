import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Gender } from 'src/common/constants/enums/gender.enum';
import { ResponseMemberDto } from '../members/dtos/response-member.dto';
import { MembersRepository } from '../members/member.repository';
import { ResponseLLMDto } from './dto/responce-llm.dto';
import { mealRecommendationExamples } from './prompts/meal-recomendation-examples';

@Injectable()
export class LlmModuleService {
  constructor(private readonly memberRepository: MembersRepository) {}

  private readonly googleGenerativeModel = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

  async getRecommendation(email: any): Promise<ResponseLLMDto> {
    const member = await this.memberRepository.findOne({ email: email });

    const memberChallenges = []; // TODO: call member_challenge repo method to get challenges of member

    const bmr = await this.calculateBMR(member);

    const messages = [
      new SystemMessage(
        `Using json that is provided (user physical parameters and challenges he is currently in), generate daily recommedations for the user about his nutrition. Dont write code, just write the text that user can read. Use the data from the json to generate the recommendations. Write general recommendations, not specific ones. Write only key recommendations. Use BMR value to calculate the daily caloric intake for the user. Pay attention to user\`s goal`,
      ),
      ...mealRecommendationExamples.map((ex) => [ex.input, ex.output]).flat(),
      new HumanMessage(`User data: ${JSON.stringify(member)}
      BMR: ${bmr}
      Current Challenges: ${JSON.stringify(memberChallenges)}`),
    ];

    const responce = await this.googleGenerativeModel.invoke(messages);
    return {
      ai_response: responce.text,
      bmr: bmr,
    };
  }

  async calculateBMR(member: ResponseMemberDto): Promise<number> {
    if (!member || !member.gender || !member.weight || !member.height || !member.age) {
      throw new BadRequestException('Insufficient member data for BMR calculation.');
    }

    let bmr: number;

    if (member.gender === Gender.MALE) {
      bmr = 10 * member.weight + 6.25 * member.height - 5 * member.age + 5;
    } else if (member.gender === Gender.FEMALE) {
      bmr = 10 * member.weight + 6.25 * member.height - 5 * member.age - 161;
    } else {
      throw new BadRequestException('Unknown gender for BMR calculation.');
    }

    if (member.goal === 'lose_weight') {
      return bmr * 0.75;
    }
    if (member.goal === 'maintain_fitness') {
      return bmr;
    }
    if (member.goal === 'gain_muscle') {
      return bmr * 1.25;
    } else {
      throw new BadRequestException('Unknown goal for BMR calculation.');
    }
  }
}
