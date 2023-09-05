import { randomUUID } from 'crypto'

export class ProductOrder {
  readonly id: string

  productId: string

  orderId: string

  quantity: number

  price: number

  constructor() {
    this.id = randomUUID()
  }
}
