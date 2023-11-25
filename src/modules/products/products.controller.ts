import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Roles } from '../auth/roles.decorator'
import { UserRole } from 'src/common/role.enum'
import { RolesGuard } from '../auth/roles.guard'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('')
  // @ApiBearerAuth()
  // @Roles(UserRole.Admin, UserRole.Employee)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('products')
  @CacheTTL(60 * 60)
  @Get('')
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':sku')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 10)
  findOne(@Param('sku') sku: string) {
    return this.productsService.findOne(sku)
  }

  @Patch(':sku')
  // @ApiBearerAuth()
  // @Roles(UserRole.Admin, UserRole.Employee)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(sku, updateProductDto)
  }

  @Patch('upload/:sku')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'productImage', maxCount: 1 }]),
  )
  upload(
    // eslint-disable-next-line no-undef
    @UploadedFiles() files: { productImage?: Express.Multer.File[] },
    @Param('sku') sku: string,
  ) {
    const { productImage } = files
    return this.productsService.upload(sku, productImage[0])
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
