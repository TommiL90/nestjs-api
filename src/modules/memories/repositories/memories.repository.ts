import { CreateMemoryDto } from '../dto/create-memory.dto';
import { UpdateMemoryDto } from '../dto/update-memory.dto';
import { Memory } from '../entities/memory.entity';

export abstract class MemoriesRepository {
  abstract create(data: CreateMemoryDto, userId: string): Promise<Memory>;
  abstract findAllByOwner(ownerId: string): Promise<Memory[]>;
  abstract findAll(): Promise<Memory[] | object>; // object por causa do retorno.
  abstract findOne(id: string): Promise<Memory | undefined>;
  abstract update(id: string, data: UpdateMemoryDto): Promise<Memory>;
  abstract delete(id: string): Promise<void>;
}
