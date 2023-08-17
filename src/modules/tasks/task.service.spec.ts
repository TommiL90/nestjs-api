import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { randomUUID } from 'crypto'
import { Task } from './entities/task.entity'
import { PrismaService } from '../../database/prisma.service'
import { TasksRepository } from './repositories/tasks.repository'
import { TasksPrismaRepository } from './repositories/prisma/tasks.prisma.repository'
import { NotFoundException } from '@nestjs/common'

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

const expectedTasks: Task[] = [new Task(), new Task(), new Task(), new Task()]

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
    remove: jest.fn(),
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
      const taskId = '123'
      const result = await service.findOne(taskId)

      expect(result).toEqual(mockTasks[0])
    })

    it('should throw a NotFoundException when an invalid id is provided', async () => {
      const taskId = 'invalidId'

      // Act and Assert
      await expect(service.findOne(taskId)).rejects.toThrow(NotFoundException)
    })
  })


})
