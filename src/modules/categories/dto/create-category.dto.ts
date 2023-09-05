import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { CategoryName } from '../../../common/category.enum'

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Sides',
    enum: CategoryName,
    enumName: 'CategoryName',
    required: true,
    minLength: 3,
    maxLength: 7,
  })
  @IsEnum(CategoryName)
  @IsNotEmpty()
  name: string
}
