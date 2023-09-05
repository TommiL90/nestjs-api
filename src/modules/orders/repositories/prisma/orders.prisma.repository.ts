import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from '../../dto/create-order.dto'
import { UpdateOrderDto } from '../../dto/update-order.dto'
import { Order } from '../../entities/order.entity'
import { OrdersRepository } from '../orders.repository'
import { PrismaService } from '../../../../database/prisma.service'

@Injectable()
export class OrdersPrismaRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto, idUser: string): Promise<Order> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { products, ...rest } = data

    const order = new Order()
    Object.assign(order, { ...rest, idUser })
    const newOrder = await this.prisma.order.create({
      data: { ...order },
    })
    return newOrder
  }

  async findAll(): Promise<Order[]> {
    return await this.prisma.order.findMany({ include: { products: true } })
  }

  async findOne(id: string): Promise<Order> {
    return await this.prisma.order.findUnique({
      include: { products: true },
      where: { id },
    })
  }

  async update(id: string, order: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        paid: order.paid,
        status: order.status,
        totalPrice: order.totalPrice,
      },
      include: { products: true },
    })

    return updatedOrder
  }

  async remove(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } })
  }
}
