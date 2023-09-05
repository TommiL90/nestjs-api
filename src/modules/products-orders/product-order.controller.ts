import { Controller } from '@nestjs/common'
import { ProductsOrderService } from './product-order.service'

@Controller('order-products')
export class ProductsOrderController {
  constructor(private readonly orderProductsService: ProductsOrderService) {}
}
