import { CreateTaskDto } from '../dto/create-task.dto'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { Task } from '../entities/tasks.entity'

export abstract class TasksRepository {
  abstract create(data: CreateTaskDto, userId: string): Promise<Task>
  abstract findAllByOwner(ownerId: string): Promise<Task[]>
  abstract findOne(id: string): Promise<Task | undefined>
  abstract update(id: string, data: UpdateTaskDto): Promise<Task>
  abstract delete(id: string): Promise<void>
}
