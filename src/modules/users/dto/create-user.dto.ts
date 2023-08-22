import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator'
import { UserRole } from '../../../common/role.enum'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'The name of the user',
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
    example: 'example@example.com',
    description: 'Email of the user',
    required: true,
    type: String,
    default: 'example@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(120)
  email: string

  @ApiProperty({
    enum: UserRole,
    default: UserRole.User,
    description: 'The role of the user',
  })
  @IsOptional()
  role?: UserRole

  @ApiProperty({
    example: 'pasSwo@rd123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(120)
  @Matches(/.*[A-Z].*/, {
    message: 'The password must contain at least one uppercase letter',
  })
  @Matches(/.*\d.*/, {
    message: 'The password must contain at least one number',
  })
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string
}
