import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // No roles are required, access is granted
    }
    const { user } = context.switchToHttp().getRequest();

    // user.roles is an array of Role objects from the database, e.g., [{ id: 1, name: 'admin' }]
    // requiredRoles is an array of Role enum values, e.g., ['admin', 'kajur']
    return requiredRoles.some((role) => user.roles?.some(userRole => userRole.name === role));
  }
}
