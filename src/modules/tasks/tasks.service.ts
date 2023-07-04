import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksRepository } from './repositories/tasks.repository'

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const newTask = await this.tasksRepository.create(createTaskDto, userId)
    return newTask
  }

  findAllByOwner(userId: string, keywords?: string) {
    const tasks = this.tasksRepository.findAllByOwner(userId, keywords)
    return tasks
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne(id)
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    return task
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksRepository.update(id, updateTaskDto)
    if (!updatedTask) {
      throw new NotFoundException('Task not found')
    }
    return updatedTask
  }

  async remove(id: string) {
    const deletedTask = this.tasksRepository.delete(id)
    if (!deletedTask) {
      throw new NotFoundException('Task not found')
    }
    return deletedTask
  }
}
