import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ProductsRepository } from './repositories/products.repository'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { v2 as cloudinary } from 'cloudinary'
import { unlink } from 'fs'
import { CategoriesService } from '../categories/categories.service'

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    this.verifyCategory(createProductDto.categoryId)

    const findProduct = await this.productsRepository.findOne(
      createProductDto.sku,
    )

    if (findProduct) {
      throw new ConflictException('Product already exists')
    }

    return this.productsRepository.create(createProductDto)
  }

  findAll() {
    return this.productsRepository.findAll()
  }

  findOne(sku: string) {
    const product = this.productsRepository.findOne(sku)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }

  update(sku: string, updateProductDto: UpdateProductDto) {
    const product = this.productsRepository.update(sku, updateProductDto)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }

  // eslint-disable-next-line no-undef
  async upload(sku: string, coverImage: Express.Multer.File) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })

    const findProduct = await this.productsRepository.findOne(sku)

    if (!findProduct) {
      throw new NotFoundException('Product not found')
    }

    const uploadedImage = await cloudinary.uploader.upload(
      coverImage.path,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          throw new NotFoundException('Image not found')
        }
        return result
      },
    )

    console.log(uploadedImage)
    const updatedProduct = await this.productsRepository.update(sku, {
      ...UpdateProductDto,
      imgUrl: uploadedImage.secure_url,
    })

    unlink(coverImage.path, (err) => {
      if (err) {
        console.log(err)
      }
    })

    return updatedProduct
  }

  remove(sku: string) {
    const deletedProduct = this.productsRepository.remove(sku)
    if (!deletedProduct) {
      throw new NotFoundException('Product not found')
    }
    return deletedProduct
  }

  private verifyCategory(categoryId: string) {
    const findCategory = this.categoriesService.findOne(categoryId)

    if (!findCategory) {
      throw new NotFoundException('Category not found')
    }
  }
}
