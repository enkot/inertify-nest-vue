import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Redis from 'redis'

import { REDIS } from './redis.constants'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS,
      useFactory: async (config: ConfigService) => {
        const url = config.get<string>('REDIS_URL')
        return Redis.createClient({ url })
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
