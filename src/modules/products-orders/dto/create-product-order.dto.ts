import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductOrderDto {
  @ApiProperty({
    description: 'Product ID',
    example: 1,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  productId: string

  @ApiProperty({
    description: 'Order ID',
    example: 1,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  orderId: string

  @ApiProperty({
    description: 'Quantity',
    example: 1,
    required: true,
    type: Number,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @ApiProperty({
    description: 'Total price',
    example: '$150.99',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value).toFixed(2), { toClassOnly: true })
  totalPrice: number
}
