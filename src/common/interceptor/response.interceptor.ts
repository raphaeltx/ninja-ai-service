import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormattedResponse } from 'src/domain/interfaces/formatted-response.interfaces';

/**
 * ResponseTransformInterceptor transforms the response of the request.
 * It formats the response to include a success flag, message, data, and an optional error code.
 */
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor {
  /**
   * Intercepts the request and transforms the response.
   * @param context - The execution context.
   * @param next - The next handler in the chain.
   * @returns An observable of the transformed response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.formatResponse(true, 'Request successful', data, null);
      }),
    );
  }

  /**
   * Formats the response object.
   * @param success - Indicates if the request was successful.
   * @param message - A message describing the result of the request.
   * @param data - The data returned from the request.
   * @param errorCode - An optional error code, if applicable.
   * @returns A formatted response object.
   */
  private formatResponse<T>(
    success: boolean,
    message: string,
    data: T,
    errorCode: string | null,
  ): FormattedResponse<T> {
    return {
      success,
      message,
      data,
      errorCode,
    };
  }
}
