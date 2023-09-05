import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { PrismaService } from '../../database/prisma.service'
import { OrdersRepository } from './repositories/orders.repository'
import { OrdersPrismaRepository } from './repositories/prisma/orders.prisma.repository'
import { ProductsModule } from '../products/products.module'
import { ProductsOrderModule } from '../products-orders/product-order.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [ProductsModule, ProductsOrderModule, UsersModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    { provide: OrdersRepository, useClass: OrdersPrismaRepository },
  ],
})
export class OrdersModule {}
