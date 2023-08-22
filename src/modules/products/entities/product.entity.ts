import { randomUUID } from 'crypto'

export class Product {
  readonly id: string
  name: string
  price: number
  description: string
  stock: number
  sku: string
  categoryId: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date

  constructor() {
    this.id = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
