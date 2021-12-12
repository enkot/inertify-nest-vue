import { Controller, Get, UseGuards } from '@nestjs/common'
import { Render } from '@inertify/nest'
import { AuthGuard } from '../auth/guards/auth.guard'

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  @Get()
  @Render('Reports/Index')
  async index() {}
}
