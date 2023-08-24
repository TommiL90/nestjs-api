import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail)
    if (user) {
      const passwordMatch = await compare(userPassword, user.password)
      if (passwordMatch) {
        return { email: user.email }
      }
    }

    return null
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email)
    return {
      role: user.role,
      token: this.jwtService.sign(
        { email, role: user.role },
        { subject: user.id },
      ),
    }
  }

  async loginWithProviders(payload) {
    const user = await this.userService.createNextAuthUser(payload)

    return {
      role: user.role,
      token: this.jwtService.sign(
        { email: user.email, role: user.role },
        { subject: user.id },
      ),
    }
  }
}
