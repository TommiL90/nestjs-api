import { ApiProperty } from '@nestjs/swagger'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateProductDto {
  @ApiProperty({
    example: 'Product 1',
    description: 'Name of the product',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @MinLength(3)
  name: string

  @ApiProperty({
    example: 'Royal Canin',
    description: 'Brand of the product',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @MinLength(3)
  brand: string

  @ApiProperty({
    example: 'Product description',
    description: 'Description of the product',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 300,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @MinLength(3)
  description: string

  @ApiProperty({
    example: '$120,00',
    description: 'Price of the product',
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty({
    example: '10',
    description: 'Stock of the product',
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  stock: number

  @ApiProperty({
    example: 'Category 1',
    description: 'Category of the product',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @MinLength(3)
  categoryId: string

  @ApiProperty({
    example: 'Sku048546...',
    description: 'Sku of the product',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @MinLength(3)
  sku: string

  @ApiProperty({
    example: 'https://www.google.com/image.png',
    description: 'Image of the product',
    required: false,
    type: String,
    minLength: 3,
    maxLength: 120,
    default: null,
  })
  @IsOptional()
  @IsString()
  imgUrl?: string | null
}
