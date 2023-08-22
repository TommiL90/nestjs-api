import { CreateNextAuthUserDto } from '../dto/create-NextAuthUser.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'

// Se todos os métodos de Classes abstarta forem sem corpo, ela se torna uma Interface.
export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User> | User
  abstract createNextAuthUser(data: CreateNextAuthUserDto): Promise<User> | User
  abstract findAll(): Promise<User[]> | User[]
  abstract findOne(id: string): Promise<User | undefined> | User | undefined
  abstract findByEmail(email: string): Promise<User> | User
  abstract update(id: string, data: UpdateUserDto): Promise<User> | User
  abstract delete(id: string): Promise<void> | void
}
