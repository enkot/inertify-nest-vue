import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { Render } from '@inertify/nest'
import { PrismaService } from './prisma/prisma.service'
import { AuthGuard } from './auth/guards/auth.guard'

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @Render('Dashboard/Index')
  async index(@Req() req): Promise<Record<string, any>> {
    const [organizationsCount, contactsCount] = await Promise.all([
      this.prismaService.organization.count({
        where: {
          accountId: req.user?.accountId,
        },
      }),
      this.prismaService.contact.count({
        where: {
          accountId: req.user?.accountId,
        },
      }),
    ])
    const stats = [
      {
        id: 'organizations',
        stat: organizationsCount,
        change: 0,
        changeType: 'increase',
      },
      {
        id: 'contacts',
        stat: contactsCount,
        change: 0,
        changeType: 'increase',
      },
      { id: 'reports', stat: 0, change: 0, changeType: 'decrease' },
    ]

    return { stats }
  }

  @Get('500')
  @Render('500')
  error() {}

  @Get('404')
  @Render('404')
  notFound() {}
}
