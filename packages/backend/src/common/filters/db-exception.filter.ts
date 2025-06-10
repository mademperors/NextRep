import { Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(EntityNotFoundError, QueryFailedError)
export class DBExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError | QueryFailedError) {
    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'An unexpected database error occurred.';
    let errorResponse;

    if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Entity not found.';
      errorResponse = {
        statusCode: status,
        message: message,
      };
    } else if (exception instanceof QueryFailedError) {
      // Log the full error for debugging in development/server logs
      console.error('QueryFailedError:', exception.message, exception['code']);

      const pgErrorCode = exception['code']; // PostgreSQL specific error code

      switch (pgErrorCode) {
        case '23505': // Unique violation
          status = HttpStatus.CONFLICT; // 409 Conflict
          message = 'A resource with this unique identifier already exists.';
          errorResponse = {
            statusCode: status,
            message: message,
          };
          break;
        case '23503': // Foreign key violation
          status = HttpStatus.BAD_REQUEST; // 400 Bad Request or 409 Conflict depending on context
          message =
            'Associated resource not found or cannot be deleted due to existing references.';
          errorResponse = {
            statusCode: status,
            message: message,
          };
          break;
        default:
          // For all other QueryFailedErrors
          status = HttpStatus.INTERNAL_SERVER_ERROR; // 500 Internal Server Error
          message = 'Database operation failed.';
          errorResponse = {
            statusCode: status,
            message: message,
          };
          break;
      }
    }

    throw new HttpException(errorResponse, status);
  }
}
