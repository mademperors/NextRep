export interface ICRUD<Entity, CreateDto = unknown, UpdateDto = unknown> {
  findOne(options: Partial<Entity>): Promise<Entity | null>;
  find(options: Partial<Entity>): Promise<Array<Entity>>;
  create(dto: CreateDto): Promise<Entity | void>;
  update(email: string, dto: UpdateDto): Promise<Entity>;
  delete(email: string): Promise<void>;
}
