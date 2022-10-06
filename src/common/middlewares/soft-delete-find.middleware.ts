import { Prisma } from '@prisma/client'
import { Constants } from '../constants'

export function SoftDeleteFindMiddleware<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (Constants.MODEL_NAMES.includes(params.model)) {
      switch (params.action) {
        case 'findUnique': {
          params.action = 'findFirst'
          params.args.where['deletedAt'] = null
          break
        }
        case 'findFirst': {
          params.args.where['deletedAt'] = null
          break
        }
        case 'findMany': {
          params.args = {
            ...params.args,
            where: { ...params.args?.where, deletedAt: null },
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
