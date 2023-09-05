import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { Order } from '../entities/order.entity'

export abstract class OrdersRepository {
  abstract create(order: CreateOrderDto, userId: string): Promise<Order>

  abstract findAll(): Promise<Order[]>

  abstract findOne(id: string): Promise<Order | undefined>

  abstract update(id: string, order: UpdateOrderDto): Promise<Order>

  abstract remove(id: string): Promise<void>
}
