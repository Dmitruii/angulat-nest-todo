import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      let errorMessages = {}

      errors.forEach(({property, constraints}) => {
        errorMessages = {...errorMessages, [property]: Object.values(constraints)}
      })

      throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST)
    }

    return value
  }
}