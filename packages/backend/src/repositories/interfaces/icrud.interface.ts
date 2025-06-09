import { FindOptionsWhere } from 'typeorm';

export interface ICRUD<
  Entity,
  Dtos extends {
    CreateDto?: unknown;
    UpdateDto?: unknown;
    ResponseDto?: unknown;
  } = Record<string, unknown>,
  Param = string | number,
> {
  findOne(options: FindOptionsWhere<Entity>): Promise<Dtos['ResponseDto']>;
  find(options: FindOptionsWhere<Entity>): Promise<Dtos['ResponseDto'][]>;
  create(dto: Dtos['CreateDto']): Promise<Dtos['ResponseDto'] | void>;
  update(param: Param, dto: Dtos['UpdateDto']): Promise<Dtos['ResponseDto']>;
  delete(param: Param): Promise<void>;
}
