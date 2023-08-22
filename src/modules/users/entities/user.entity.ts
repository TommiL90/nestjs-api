import { Role } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { randomUUID } from 'node:crypto'

export class User {
  readonly id: string
  name: string
  email: string
  role: Role
  createdAt: Date
  updatedAt: Date

  @Exclude()
  password: string

  constructor() {
    this.id = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
