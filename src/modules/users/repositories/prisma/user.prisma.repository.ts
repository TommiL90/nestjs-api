import { CreateUserDto } from '../../dto/create-user.dto'
import { UpdateUserDto } from '../../dto/update-user.dto'
import { User } from '../../entities/user.entity'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../database/prisma.service'
import { plainToInstance } from 'class-transformer'
import { UserRepository } from '../user.repository'
import { CreateNextAuthUserDto } from '../../dto/create-nextauth-user.dto'

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User()
    Object.assign(user, { ...data })
    const newUser = await this.prisma.user.create({
      data: { ...user },
    })
    return plainToInstance(User, newUser)
  }

  async createNextAuthUser(data: CreateNextAuthUserDto): Promise<User> {
    const user = new User()
    Object.assign(user, { ...data })
    const loggedUser = await this.prisma.user.upsert({
      where: { email: data.email },
      create: { ...user },
      update: {},
    })

    return loggedUser
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return plainToInstance(User, users)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    return plainToInstance(User, user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    })
    return plainToInstance(User, user)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }
}
