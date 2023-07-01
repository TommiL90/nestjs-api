import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  IsOptional,
  MaxLength,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string

  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
    required: true,
    type: String,
    default: 'example@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(120)
  email: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isAdmin: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(120)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string
}
