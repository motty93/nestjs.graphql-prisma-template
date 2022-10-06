import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'
import {
  SoftDeleteFindMiddleware,
  SoftDeleteUpdateMiddleware,
} from '~/common/middlewares'

// cleanup不要なテーブルをここに書く
const excludeModelNames = ['Health']

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    })

    // measures soft delete
    this.$use(SoftDeleteUpdateMiddleware())
    // find deletedAt null
    this.$use(SoftDeleteFindMiddleware())
  }

  // 省略すると遅延接続
  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      )
    })

    this.$on('info', (event) => {
      this.logger.log(`info: ${event.message}`)
    })

    this.$on('error', (event) => {
      this.logger.log(`error: ${event.message}`)
    })

    this.$on('warn', (event) => {
      this.logger.log(`warn: ${event.message}`)
    })

    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  async cleanupDatabase(): Promise<number> {
    const prisma = new PrismaClient()
    const modelNames = Prisma.dmmf.datamodel.models
      .map((model) => model.name)
      .filter((modelName) => !excludeModelNames.includes(modelName))

    await this.$transaction(
      modelNames.map((model) =>
        this.$executeRawUnsafe(
          `TRUNCATE TABLE "${model}" RESTART IDENTITY CASCADE;`,
        ),
      ),
    )
    prisma.$disconnect()

    return modelNames.length
  }
}
