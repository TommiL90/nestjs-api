import { CreateCategoryDto } from '../dto/create-category.dto'
import { Category } from '../entities/category.entity'
import { UpdateCategoryDto } from '../dto/update-category.dto'

export abstract class CategoriesRepository {
  abstract create(category: CreateCategoryDto): Promise<Category>

  abstract findAll(): Promise<Category[]>

  abstract findOne(id: string): Promise<Category | undefined>

  abstract findByName(name: string): Promise<Category | undefined>

  abstract update(id: string, category: UpdateCategoryDto): Promise<Category>

  abstract remove(id: string): Promise<void>
}
