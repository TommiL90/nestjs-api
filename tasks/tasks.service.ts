// import { Injectable } from '@nestjs/common'
// import { CreateTaskDto } from './dto/create-task.dto'
// import { UpdateTaskDto } from './dto/update-task.dto'
// import { TasksRepository } from './repositories/tasks.repostory'

// Injectable()
// export class TasksService {
//   constructor(private tasksRepository: TasksRepository) {}

//   async create(createTaskDto: CreateTaskDto, userId: string) {
//     console.log(createTaskDto, userId, "Taskservice")
//     const newTask = await this.tasksRepository.create(createTaskDto, userId)
//     return newTask
//   }

//   async findTasksbyOwner(userId: string) {
//     const tasks = await this.tasksRepository.findAllByOwner(userId)
//     return tasks
//   }

//   async findOne(id: string) {
//     const task = await this.tasksRepository.findOne(id)
//     return task
//   }

//   async update(id: string, updateTaskDto: UpdateTaskDto) {
//     const updatedTask = await this.tasksRepository.update(id, updateTaskDto)
//     return updatedTask
//   }

//   async remove(id: string) {
//     return await this.tasksRepository.delete(id)
//   }
// }
