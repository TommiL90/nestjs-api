import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginDTO {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
    required: true,
    type: String,
    default: 'example@example.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password of the user',
    example: 'XXXXXXXXXX',
    required: true,
    type: String,
    default: '123456789',
  })
  @IsString()
  password: string
}
