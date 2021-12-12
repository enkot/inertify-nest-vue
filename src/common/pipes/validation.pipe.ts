import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value

    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value, {
      enableImplicitConversion: true,
    })
    const errors = await validate(object, { transform: true })

    if (errors.length > 0)
      throw new UnprocessableEntityException(this.buildError(errors))

    return object
  }

  private buildError(errors) {
    const result = {}
    errors.forEach((el) => {
      Object.entries(el.constraints).forEach((constraint) => {
        result[el.property] = `The ${constraint[1]}`
      })
    })
    return result
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find((type) => metatype === type)
  }
}
