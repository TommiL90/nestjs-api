import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { ProductsOrderController } from './product-order.controller'
import { ProductsOrderService } from './product-order.service'
import { ProductsOrderRepository } from './repositories/product-order.repository'
import { ProductsOrderPrismaRepository } from './repositories/prisma/product-order.prisma.repository'

@Module({
  controllers: [ProductsOrderController],
  providers: [
    ProductsOrderService,
    PrismaService,
    {
      provide: ProductsOrderRepository,
      useClass: ProductsOrderPrismaRepository,
    },
  ],
  exports: [ProductsOrderService],
})
export class ProductsOrderModule {}
