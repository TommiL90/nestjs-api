import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { OrdersStatus } from '@prisma/client'

class ProductInOrderDto {
  @IsNotEmpty()
  productId: string

  @IsNotEmpty()
  quantity: number
}

export class CreateOrderDto {
  @ApiProperty({
    example: 'Product description',
    description: 'Description of the product',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 120,
  })
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(120)
  @MinLength(5)
  description: string

  @ApiProperty({
    description: 'Status of the Order',
    example: 'Sides',
    enum: OrdersStatus,
    enumName: 'OrdersStatus',
    required: true,
    minLength: 3,
    maxLength: 7,
    default: OrdersStatus.Created,
  })
  @IsEnum(OrdersStatus)
  @IsNotEmpty()
  status: OrdersStatus

  @ApiProperty({
    description: 'Total price of the order',
    example: '150.99',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value).toFixed(2), { toClassOnly: true })
  totalPrice: number

  @ApiProperty({
    description: 'Price of the product',
    example: '10.00',
    type: Boolean,
    required: true,
    minLength: 3,
    maxLength: 7,
  })
  paid: boolean

  @ApiProperty({
    description: 'Products in the order',
    type: ProductInOrderDto,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductInOrderDto)
  products: ProductInOrderDto[]
}
