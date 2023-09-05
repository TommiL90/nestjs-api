import { OrdersStatus } from '@prisma/client'
import { randomUUID } from 'crypto'

export class Order {
  readonly id: string

  status: OrdersStatus

  totalPrice: number

  paid: boolean

  userId: string

  createdAt: Date

  updatedAt: Date

  constructor() {
    this.id = randomUUID()
    this.status = OrdersStatus.Created
    this.paid = false
    this.totalPrice = 0
    this.createdAt = new Date()
  }
}
