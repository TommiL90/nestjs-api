import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { randomUUID } from 'crypto'
import { Task } from './entities/task.entity'
import { PrismaService } from '../../database/prisma.service'
import { TasksRepository } from './repositories/tasks.repository'
import { TasksPrismaRepository } from './repositories/prisma/tasks.prisma.repository'
import { NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

const mockTasks: Task[] = [
  {
    id: '123',
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
    createdAt: new Date('2023-07-07T13:37:34.926Z'),
    updatedAt: new Date('2023-07-07T13:37:34.926Z'),
    userId: '1',
  },
  {
    id: '1234',
    title: '1234',
    description: 'Description for Task 2',
    completed: true,
    createdAt: new Date('2023-07-07T13:37:34.926Z'),
    updatedAt: new Date('2023-07-07T13:37:34.926Z'),
    userId: randomUUID(),
  },
  {
    id: '12345',
    title: '12345',
    description: 'Description for Task 3',
    completed: false,
    createdAt: new Date('2023-07-07T13:37:34.926Z'),
    updatedAt: new Date('2023-07-07T13:37:34.926Z'),
    userId: randomUUID(),
  },
]

const prismaMock = {
  task: {
    create: jest.fn().mockReturnValue(mockTasks[0]),
    findMany: jest.fn().mockResolvedValue(mockTasks),
    findUnique: jest.fn((args) => {
      if (args.where.id === 'invalidId') {
        return null
      }
      return mockTasks[0]
    }),
    update: jest.fn().mockResolvedValue(mockTasks[0]),
    delete: jest.fn(undefined),
  },
}

describe('TasksService', () => {
  let service: TasksService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: TasksRepository, useClass: TasksPrismaRepository },
      ],
    }).compile()

    service = module.get<TasksService>(TasksService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(prismaService).toBeDefined()
  })

  describe('findOne', () => {
    it('should find a task', async () => {
      const taskId = '1'
      const result = await service.findOne(taskId)

      expect(result).toEqual(mockTasks[0])
    })

    it('should throw a NotFoundException when an invalid id is provided', async () => {
      const taskId = 'invalidId'

      await expect(service.findOne(taskId)).rejects.toThrow(NotFoundException)
    })

    it('should throw a NotFoundException when an invalid id is provided', async () => {
      const taskId = 'invalidId'

      jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(null)

      await expect(service.findOne(taskId)).rejects.toThrow(NotFoundException)
    })
  })

  describe('findAllByOwner', () => {
    it('should find tasks by owner', async () => {
      const userId = '1'
      const keywords = undefined

      const result = await service.findAllByOwner(userId, keywords)

      expect(result).toEqual(mockTasks)
    })

    it('should return an empty array when no tasks are found', async () => {
      jest.spyOn(prismaService.task, 'findMany').mockResolvedValue([])

      expect(await service.findAllByOwner('1')).toEqual([])
    })
  })

  describe('create', () => {
    const userId = '1'
    const dto: CreateTaskDto = {
      title: 'Task 5',
      description: 'Description for Task 8',
      completed: false,
    }
    it('should create task', async () => {
      const task: Task = await service.create(dto, userId)
      expect(task.title).toBe(mockTasks[0].title)
      expect(task.description).toBe(mockTasks[0].description)
      expect(task.completed).toBe(mockTasks[0].completed)
    })
  })

  describe('update', () => {
    const taskId = '1265'
    const data = new UpdateTaskDto()
    data.title = 'New Title'
    data.description = 'New Description'
    data.completed = true

    const updatedTask = {
      ...mockTasks[0],
      title: data.title,
      description: data.description,
      completed: data.completed,
      updatedAt: new Date(),
    }
    it('should update a task', async () => {
      jest.spyOn(prismaService.task, 'update').mockResolvedValue(updatedTask)

      const task: Task = await service.update(taskId, data)
      expect(task.title).toBe(updatedTask.title)
      expect(task.description).toBe(updatedTask.description)
      expect(task.completed).toBe(updatedTask.completed)
    })

    it('should throw a NotFoundException when an invalid id is provided', async () => {
      const invalidTaskId = 'invalidId'

      jest.spyOn(prismaService.task, 'update').mockResolvedValue(null)

      await expect(service.update(invalidTaskId, data)).rejects.toThrow(
        NotFoundException,
      )
    })

    describe('delete', () => {
      it('should delete a task', async () => {
        const taskId = '1265'

        await service.remove(taskId)
      })

      // it('should throw a NotFoundException when task is not found', async () => {
      //   const taskId = '123'
      //   jest.spyOn(prismaService.task, 'delete').mockResolvedValue(undefined)

      //   await expect(service.remove(taskId)).rejects.toThrow(NotFoundException)
      // })
    })
  })
})
