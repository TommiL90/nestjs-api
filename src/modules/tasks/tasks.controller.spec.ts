import { TestingModule, Test } from '@nestjs/testing'
import { TasksController } from './tasks.controller'
import { PrismaService } from '../../database/prisma.service'
import { TasksPrismaRepository } from './repositories/prisma/tasks.prisma.repository'
import { TasksRepository } from './repositories/tasks.repository'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'

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
    userId: '1',
  },
  {
    id: '12345',
    title: '12345',
    description: 'Description for Task 3',
    completed: false,
    createdAt: new Date('2023-07-07T13:37:34.926Z'),
    updatedAt: new Date('2023-07-07T13:37:34.926Z'),
    userId: '2',
  },
]

const prismaMock = {
  task: {
    create: jest.fn(),
    findMany: jest.fn().mockResolvedValue(mockTasks),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}

describe('TodoController', () => {
  let tasksController: TasksController
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: TasksRepository, useClass: TasksPrismaRepository },
      ],
    }).compile()

    tasksController = module.get<TasksController>(TasksController)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(tasksController).toBeDefined()
    expect(prismaService).toBeDefined()
  })

  describe('findAllByOwner', () => {
    it('should find tasks by owner', async () => {
      const req = { user: { id: '1' } }
      const keywords = undefined

      const result = await tasksController.findAllByOwner(req, keywords)
      expect(result).toEqual(mockTasks)
    })
  })
})
