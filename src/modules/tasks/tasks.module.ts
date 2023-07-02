import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { TasksRepository } from './repositories/tasks.repository'
import { TasksPrismaRepository } from './repositories/prisma/tasks.prisma.respository'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    { provide: TasksRepository, useClass: TasksPrismaRepository },
  ],
})
export class TasksModule {}
