import { Injectable } from '@nestjs/common'
import { ProductsOrderRepository } from './repositories/product-order.repository'
import { CreateProductOrderDto } from './dto/create-product-order.dto'
import { ProductOrder } from './entities/product-order.entity'

@Injectable()
export class ProductsOrderService {
  constructor(private productsOrderRepository: ProductsOrderRepository) {}

  async create(
    createProductOrderDto: CreateProductOrderDto,
  ): Promise<ProductOrder> {
    const newOrderProduct = await this.productsOrderRepository.create(
      createProductOrderDto,
    )

    return newOrderProduct
  }

  async findAll(): Promise<ProductOrder[] | []> {
    return await this.productsOrderRepository.findAll()
  }

  async findOne(id: string): Promise<ProductOrder> {
    const orderProduct = await this.productsOrderRepository.findOne(id)
    return orderProduct
  }
}
