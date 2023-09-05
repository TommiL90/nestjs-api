import { Test, TestingModule } from '@nestjs/testing'
import { ProductsOrderController } from './product-order.controller'
import { ProductsOrderService } from './product-order.service'

describe('OrderProductsController', () => {
  let controller: ProductsOrderController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsOrderController],
      providers: [ProductsOrderService],
    }).compile()

    controller = module.get<ProductsOrderController>(ProductsOrderController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
