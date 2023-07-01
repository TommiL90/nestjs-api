import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateMemoryDto {
  @ApiProperty({
    description: 'Title of the memory',
    example: 'My memory example',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Description of the memory',
    example: 'My description example',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: 'Cover image of the memory',
    example: 'https://my-memory-cover-image.com',
    required: false,
    default: null,
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  coverImage: string | null
}
