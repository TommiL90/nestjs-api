import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../database/prisma.service'
import { ProductsOrderRepository } from '../product-order.repository'
import { CreateProductOrderDto } from '../../dto/create-product-order.dto'
import { ProductOrder } from '../../entities/product-order.entity'

@Injectable()
export class ProductsOrderPrismaRepository implements ProductsOrderRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductOrderDto): Promise<ProductOrder> {
    const orderProduct = new ProductOrder()
    Object.assign(orderProduct, data)
    return await this.prisma.productOrder.create({ data: { ...orderProduct } })
  }

  async findAll(): Promise<ProductOrder[] | []> {
    return await this.prisma.productOrder.findMany()
  }

  async findOne(id: string): Promise<ProductOrder> {
    return await this.prisma.productOrder.findUnique({
      where: { id },
    })
  }
}
