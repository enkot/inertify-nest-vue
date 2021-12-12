import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  UnprocessableEntityException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const error = exception.getResponse() as Record<string, any>

    if (exception instanceof UnauthorizedException) {
      request.flash('flash', {
        type: 'error',
        message: error?.message || exception.message,
      })
      response.redirect('/auth/login')
    } else if (
      exception instanceof ForbiddenException ||
      exception instanceof ConflictException
    ) {
      request.flash('flash', {
        type: 'error',
        message: error?.message || exception.message,
      })
      response.redirect(303, 'back')
    } else if (exception instanceof UnprocessableEntityException) {
      request.flash('errors', exception.getResponse())
      response.redirect(303, 'back')
    } else if (exception instanceof NotFoundException) {
      response.redirect('/404')
    } else {
      response.redirect('/500')
    }
  }
}
