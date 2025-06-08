import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NotEmptyBodyPipe implements PipeTransform {
  transform(value: string | number) {
    if (value == null || Object.keys(value).length === 0) {
      throw new BadRequestException('Request body must not be empty');
    }
    return value;
  }
}
