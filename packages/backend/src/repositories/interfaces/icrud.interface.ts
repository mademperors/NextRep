import { FindOptionsWhere } from 'typeorm';

export interface ICRUD<
  Entity,
  Dtos extends {
    CreateDto?: unknown;
    UpdateDto?: unknown;
    ResponseDto?: unknown;
  } = Record<string, unknown>,
> {
  findOne(options: FindOptionsWhere<Entity>): Promise<Dtos['ResponseDto']>;
  find(options: FindOptionsWhere<Entity>): Promise<Dtos['ResponseDto'][]>;
  create(dto: Dtos['CreateDto']): Promise<Dtos['ResponseDto'] | void>;
  update(email: string, dto: Dtos['UpdateDto']): Promise<Dtos['ResponseDto']>;
  delete(email: string): Promise<void>;
}
