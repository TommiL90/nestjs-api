import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { plainToInstance } from 'class-transformer'
import { MemoriesRepository } from '../memories.repository'
import { Memory } from '../../entities/memory.entity'
import { CreateMemoryDto } from '../../dto/create-memory.dto'
import { UpdateMemoryDto } from '../../dto/update-memory.dto'

@Injectable()
export class MemoriesPrismaRepository implements MemoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMemoryDto, userId: string): Promise<Memory> {
    const memory = new Memory()
    Object.assign(memory, { ...data })

    const newMemory = await this.prisma.memory.create({
      data: { ...memory, userId },
    })
    return plainToInstance(Memory, newMemory)
  }

  async findAllByOwner(ownerId: string): Promise<Memory[]> {
    const memories = await this.prisma.memory.findMany({
      where: { userId: ownerId },
    })
    return plainToInstance(Memory, memories)
  }

  async findAll(): Promise<Memory[]> {
    const memories = await this.prisma.memory.findMany()
    return plainToInstance(Memory, memories)
  }

  async findOne(id: string): Promise<Memory> {
    const retrieveMemory = await this.prisma.memory.findUnique({
      where: { id },
    })
    return plainToInstance(Memory, retrieveMemory)
  }

  async update(id: string, data: UpdateMemoryDto): Promise<Memory> {
    const updatedMemory = await this.prisma.memory.update({
      where: { id },
      data: { ...data },
    })
    return plainToInstance(Memory, updatedMemory)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.memory.delete({ where: { id } })
  }
}
