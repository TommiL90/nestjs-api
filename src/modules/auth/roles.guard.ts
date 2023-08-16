import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './roles.decorator'
import { UserRoleType } from 'src/common/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requeriredRoles = this.reflector.getAllAndOverride<UserRoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requeriredRoles) {
      return true
    }

    const { user, params } = context.switchToHttp().getRequest()

    return (
      user.id === params.id ||
      requeriredRoles.some((role: UserRoleType) => user.role.includes(role))
    )
  }
}
