import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(UnauthorizedException)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const error = exception.getResponse() as { message: string }

    request.flash('errors', {
      auth: error?.message || 'Unauthorized.',
    })
    response.redirect('/auth/login')
  }
}
