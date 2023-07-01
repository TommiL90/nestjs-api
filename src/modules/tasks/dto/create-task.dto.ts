import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { randomUUID } from 'crypto'

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'My task example',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Description of the task',
    example: 'Custom description for my task',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: 'Completed status of the task',
    example: false,
    required: false,
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed: boolean

  @ApiProperty({
    description: 'User ID of the task',
    example: `${randomUUID()}`,
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  userId: string
}
