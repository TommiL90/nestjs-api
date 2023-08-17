import { Task } from './task.entity'

describe('Task Entity', () => {
  // Tests that a Task is created successfully with a unique id and createdAt date
  it('should create a new task with an id and createdAt date', () => {
    const task = new Task()
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeDefined()
    expect(task.createdAt).toBeInstanceOf(Date)
  })
})
