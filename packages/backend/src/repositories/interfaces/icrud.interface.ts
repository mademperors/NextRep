import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface ICRUD<
  Entity,
  Dtos extends {
    CreateDto?: unknown;
    UpdateDto?: unknown;
    ResponseDto?: unknown;
  } = Record<string, unknown>,
  Param = string | number,
> {
  findOne(options: FindOneOptions<Entity>): Promise<Dtos['ResponseDto']>;
  find(options: FindManyOptions<Entity>): Promise<Dtos['ResponseDto'][]>;
  create(dto: Dtos['CreateDto']): Promise<void>;
  update(param: Param, dto: Dtos['UpdateDto']): Promise<void>;
  delete(param: Param): Promise<void>;
}
