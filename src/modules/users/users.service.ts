import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './repositories/user.repository'
import { CreateNextAuthUserDto } from './dto/create-nextauth-user.dto'

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(createUserDto.email)

    if (findUser) {
      throw new ConflictException('User already exists')
    }
    return this.usersRepository.create(createUserDto)
  }

  async createNextAuthUser(createUserDto: CreateNextAuthUserDto) {
    const findUser = await this.usersRepository.findByEmail(createUserDto.email)

    if (findUser) {
      return findUser
    }
    return this.usersRepository.createNextAuthUser(createUserDto)
  }

  findAll() {
    return this.usersRepository.findAll()
  }

  findOne(id: string) {
    const user = this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.usersRepository.update(id, updateUserDto)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  delete(id: string) {
    const deletedUser = this.usersRepository.delete(id)
    if (!deletedUser) {
      throw new NotFoundException('User not found')
    }
    return deletedUser
  }
}
