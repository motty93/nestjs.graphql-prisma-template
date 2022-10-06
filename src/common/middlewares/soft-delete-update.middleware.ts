import { Prisma } from '@prisma/client'
import { Constants } from '../constants'

export function SoftDeleteUpdateMiddleware<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (Constants.MODEL_NAMES.includes(params.model)) {
      switch (params.action) {
        case 'delete': {
          params.action = 'update'
          params.args['data'] = { deletedAt: new Date() }
          break
        }
        case 'deleteMany': {
          params.action = 'updateMany'
          if (params.args.data !== undefined) {
            params.args.data['deletedAt'] = new Date()
          } else {
            params.args['data'] = { deletedAt: new Date() }
          }
          break
        }
        default: {
          break
        }
      }
    }

    return await next(params)
  }
}
