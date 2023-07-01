import { Injectable } from '@nestjs/common'
import { TaskRepository } from '../tasks.repostory'
import { PrismaService } from 'src/database/prisma.service'
import { CreateTaskDto } from '../../dto/create-task.dto'
import { Task } from '../../entities/tasks.entity'
import { plainToInstance } from 'class-transformer'
import { UpdateTaskDto } from '../../dto/update-task.dto'

@Injectable()
export class TasksPrismaRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto, userId: string): Promise<Task> {
    console.log(data)
    const task = new Task()
    Object.assign(task, { ...data })

    const newTask = await this.prisma.task.create({
      data: { ...task, userId },
    })
    return plainToInstance(Task, newTask)
  }

  async findAllByOwner(ownerId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId: ownerId },
    })
    return plainToInstance(Task, tasks)
  }

  async findOne(id: string): Promise<Task> {
    const retrieveTask = await this.prisma.task.findUnique({
      where: { id },
    })
    return plainToInstance(Task, retrieveTask)
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: { ...data },
    })
    return plainToInstance(Task, updatedTask)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } })
  }
}
