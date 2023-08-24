import { Product } from '../entities/product.entity'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

export abstract class ProductsRepository {
  abstract create(createProductDto: CreateProductDto): Promise<Product>
  abstract findAll(): Promise<Product[]>
  abstract findOne(sku: string): Promise<Product>
  abstract update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product>

  abstract remove(sku: string): Promise<void>
}
