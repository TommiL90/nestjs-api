import { Test, TestingModule } from '@nestjs/testing'
import { ProductsOrderService } from './product-order.service'

describe('ProductsOrderService', () => {
  let service: ProductsOrderService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsOrderService],
    }).compile()

    service = module.get<ProductsOrderService>(ProductsOrderService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
