import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';
import { ResponsePublicMemberDto } from 'src/repositories/members/dtos/response-public-member.dto';
import { ResponseTrainingDto } from 'src/repositories/trainings/dtos/response-training.dto';

export class ResponseChallengeDto {
  id: number;
  challenge_info: string;
  challenge_type: ChallengeType;
  duration: number;
  current_day: number;

  @Type(() => ResponsePublicMemberDto)
  creator: ResponsePublicMemberDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseTrainingDto)
  trainings: ResponseTrainingDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsePublicMemberDto)
  enrolled: ResponsePublicMemberDto[];
}
