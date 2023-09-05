import { PrismaService } from 'src/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { CategoryName } from '../../../../common/category.enum'
import { CreateCategoryDto } from '../../dto/create-category.dto'
import { UpdateCategoryDto } from '../../dto/update-category.dto'
import { Category } from '../../entities/category.entity'
import { CategoriesRepository } from '../categories.repository'

@Injectable()
export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = new Category()
    Object.assign(category, { ...data })

    const newCategory = await this.prisma.category.create({
      data: { ...category },
    })

    return newCategory
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany()
  }

  findOne(id: string): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    })
  }

  async findByName(name: CategoryName): Promise<Category> {
    return await this.prisma.category.findFirst({
      where: { name },
    })
  }

  async update(id: string, category: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { ...category },
    })

    return updatedCategory
  }

  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } })
  }
}
