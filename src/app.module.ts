import { join } from 'path'
import * as Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { Inject, Module, MiddlewareConsumer } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import * as RedisStore from 'connect-redis'
import * as session from 'express-session'
import * as passport from 'passport'
import { readManifest } from '@inertify/core'
import { InertiaModule } from '@inertify/nest'
import { inertia } from '@inertify/express'
import { flash } from '@inertify/express-flash'
import { AllExceptionFilter } from './common/filters/all-exceptions.filter'
import { PrismaModule } from './prisma/prisma.module'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { REDIS, RedisModule } from './redis'
import { OrganizationsModule } from './organizations/organizations.module'
import { ContactsModule } from './contacts/contacts.module'
import { ReportsModule } from './reports/reports.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SESSION_SECRET: Joi.string().default('secret'),
        DATABASE_URL: Joi.string().default(
          'postgresql://postgres@localhost:5432/postgres',
        ),
        REDIS_URL: Joi.string().default('redis://localhost:6379'),
      }),
    }),
    MulterModule,
    RedisModule,
    InertiaModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ContactsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(
    private configService: ConfigService,
    @Inject(REDIS) private readonly redis,
  ) {}

  async configure(consumer: MiddlewareConsumer) {
    const sessionSecret = this.configService.get<string>('SESSION_SECRET')

    let manifest: any
    if (process.env.NODE_ENV === 'production') {
      manifest = await readManifest(
        join(__dirname, '..', '/public/manifest.json'),
      )
    }

    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: true,
          secret: sessionSecret,
          resave: false,
        }),
        passport.initialize(),
        passport.session(),
        flash(),
        inertia(manifest),
        (req: Request, res: Response, next: NextFunction) => {
          res.inertia.share({
            auth: { user: req.user },
            errors: req.flash('errors'),
            flash: req.flash('flash'),
          })
          next()
        },
      )
      .forRoutes('*')
  }
}
