import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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
}
