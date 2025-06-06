export interface IREST<Entity, CreateDto = unknown> {
  findOne(options: Partial<Entity>): Promise<Entity | null>;
  //   find(options: Partial<Entity>): Promise<Array<Entity>>;
  create(dto: CreateDto): Promise<Entity | void>;
  //   update(id: number, dto: UpdateDto): Promise<Entity>;
  //   delete(id: number): Promise<void>;
}
