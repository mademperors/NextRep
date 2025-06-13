import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function AtLeastTomorrow(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'AtLeastTomorrow',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          // Parse string in YYYY-MM-DD to Date (local time, not UTC)
          const [year, month, day] = value.split('-').map(Number);
          if (!year || !month || !day || value.length !== 10) return false;
          // Months in JS are 0-based
          const date = new Date(year, month - 1, day);
          if (isNaN(date.getTime())) return false;

          // Today's date at midnight
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          // Tomorrow at midnight
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);

          // Only accept dates at least tomorrow
          return date.getTime() >= tomorrow.getTime();
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultMessage(_args: ValidationArguments) {
          return 'Date must be at least tomorrow';
        },
      },
    });
  };
}
