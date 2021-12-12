import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import {
  PaginatedResult,
  PaginateOptions,
  createPaginator,
} from 'prisma-pagination'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  async paginate<K, T extends Record<string, any>>(
    model: any,
    args?: T,
    options?: PaginateOptions,
  ): Promise<PaginatedResult<K>> {
    const paginate = createPaginator({ perPage: 10 })

    return paginate(model, args, options)
  }
}
