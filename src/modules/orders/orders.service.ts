import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrdersRepository } from './repositories/orders.repository'
import { Order } from './entities/order.entity'
import { ProductsService } from '../products/products.service'
import { ProductsOrderService } from '../products-orders/product-order.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
    private productsOrderService: ProductsOrderService,
    private userService: UsersService,
  ) {}

  async createOrderWithProducts(
    createOrderDto: CreateOrderDto,
    idUser: string,
  ): Promise<Order> {
    await this.checkUser(idUser)

    const newOrder = await this.ordersRepository.create(createOrderDto, idUser)

    const { products } = createOrderDto

    let totalPriceOrder = 0

    for (const product of products) {
      const { productId, quantity } = product

      const productPrice = await this.productsService.findOne(productId)

      totalPriceOrder += productPrice.price * quantity

      await this.productsOrderService.create({
        productId,
        orderId: newOrder.id,
        quantity,
        totalPrice: productPrice.price * quantity,
      })
    }

    const order = await this.ordersRepository.update(newOrder.id, {
      totalPrice: totalPriceOrder,
    })

    return order
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.findAll()
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne(id)
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }
    return order
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findOne(id)
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }
    return await this.ordersRepository.update(id, updateOrderDto)
  }

  async remove(id: string): Promise<void> {
    const order = await this.ordersRepository.findOne(id)
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }
    return await this.ordersRepository.remove(id)
  }

  async checkUser(userId: string): Promise<void> {
    const finduser = await this.userService.findOne(userId)
    if (!finduser) {
      throw new NotFoundException(`User with ID ${userId} not found`)
    }
  }
}
