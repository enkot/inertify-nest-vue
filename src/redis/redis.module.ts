import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Redis from 'redis'

import { REDIS } from './redis.constants'

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async (config: ConfigService) => {
        const url = config.get<string>('REDIS_URL')
        return Redis.createClient({ url })
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
