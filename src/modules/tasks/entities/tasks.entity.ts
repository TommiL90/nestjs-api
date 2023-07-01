import { randomUUID } from 'crypto'

export class Task {
  readonly id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  userId: string

  constructor() {
    this.id = randomUUID()
    this.createdAt = new Date()
  }
}
