import { OmitType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class CreateNextAuthUserDto extends OmitType(CreateUserDto, [
  'password',
]) {}
