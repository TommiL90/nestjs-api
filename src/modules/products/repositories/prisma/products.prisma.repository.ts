import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../products.repository'
import { PrismaService } from 'src/database/prisma.service'
import { CreateProductDto } from '../../dto/create-product.dto'
import { UpdateProductDto } from '../../dto/update-product.dto'
import { Product } from '../../entities/product.entity'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<Product> {
    const product = new Product()
    Object.assign(product, data)

    const newProduct = await this.prisma.product.create({
      data: { ...product },
    })

    return plainToInstance(Product, newProduct)
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany()
    return plainToInstance(Product, products)
  }

  async findOne(sku: string): Promise<Product> {
    const retrieveProduct = await this.prisma.product.findUnique({
      where: { sku },
    })

    return plainToInstance(Product, retrieveProduct)
  }

  async update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.prisma.product.update({
      where: { sku },
      data: { ...updateProductDto },
    })

    return plainToInstance(Product, updateProduct)
  }

  async remove(sku: string): Promise<void> {
    await this.prisma.product.delete({ where: { sku } })
  }
}
