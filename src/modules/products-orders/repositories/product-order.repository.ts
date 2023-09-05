import { CreateProductOrderDto } from '../dto/create-product-order.dto'
import { ProductOrder } from '../entities/product-order.entity'

export abstract class ProductsOrderRepository {
  abstract create(
    createOrderProductDto: CreateProductOrderDto,
  ): Promise<ProductOrder>

  abstract findAll(): Promise<ProductOrder[] | []>

  abstract findOne(id: string): Promise<ProductOrder>
}
