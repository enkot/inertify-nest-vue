import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    if (await context.switchToHttp().getRequest().isAuthenticated()) return true

    throw new UnauthorizedException()
  }
}
