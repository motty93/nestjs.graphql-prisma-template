import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

/**
 * 認証が必要なエンドポイントに付与する。
 */
@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const gqlReq = ctx.getContext().req

    if (gqlReq) {
      gqlReq.body = ctx.getArgs()
      return gqlReq
    }
    return context.switchToHttp().getRequest()
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException(info)
    }
    console.info('user:', user)

    return user
  }
}
