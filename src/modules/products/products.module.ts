import { BadRequestException, Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { PrismaService } from 'src/database/prisma.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ProductsRepository } from './repositories/products.repository'
import { ProductsPrismaRepository } from './repositories/prisma/products.prisma.repository'
import { CategoriesModule } from '../categories/categories.module'
@Module({
  imports: [
    CategoriesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './temp',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`)
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(null, true)
        } else {
          cb(new BadRequestException('File is not an image'), false)
        }
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: ProductsPrismaRepository,
    },
  ],
})
export class ProductsModule {}
