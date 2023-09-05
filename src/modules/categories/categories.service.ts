import { ConflictException, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoriesRepository } from './repositories/categories.repository'

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.categoriesRepository.findByName(
      createCategoryDto.name,
    )
    if (findCategory) {
      throw new ConflictException('Category already exists')
    }

    const newCategory = await this.categoriesRepository.create(
      createCategoryDto,
    )

    return newCategory
  }

  async findAll() {
    return await this.categoriesRepository.findAll()
  }

  async findOne(id: string) {
    const retrieveCategory = await this.categoriesRepository.findOne(id)

    return retrieveCategory
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoriesRepository.update(
      id,
      updateCategoryDto,
    )

    return updatedCategory
  }

  async remove(id: string) {
    const deleteCategory = await this.categoriesRepository.findOne(id)
    if (!deleteCategory) {
      throw new ConflictException('Category not found')
    }
    await this.categoriesRepository.remove(id)
  }
}
