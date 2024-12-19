import { ValidationError, ValidationPipe } from '@nestjs/common';

export class CustomValidationError extends Error {
  constructor(readonly errors: ValidationError[]) {
    super('');
  }
}

const CustomValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors) => {
    return new CustomValidationError(errors);
  },
});

export default CustomValidationPipe;
