import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { CategoriesRepository } from './repositories/categories.repository'
import { CategoriesPrismaRepository } from './repositories/prisma/categories.prisma.repository'
import { PrismaService } from '../../database/prisma.service'

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: CategoriesPrismaRepository,
    },
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
