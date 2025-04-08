import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

/**
 * LoggingInterceptor logs incoming requests and outgoing responses.
 * It also logs errors that occur during the request handling process.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Intercepts the request and logs the relevant information.
   * @param context - The execution context.
   * @param next - The next handler in the chain.
   * @returns An observable of the response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const userAgent = request.headers['user-agent'] || 'unknown';
    const ip = request.ip || 'unknown';
    const startTime = Date.now();

    this.logger.log(this.formatRequestLog(method, url, ip, userAgent));

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.logger.log(this.formatResponseLog(method, url, duration));
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        this.logger.error(
          this.formatErrorLog(method, url, duration, error.message),
          error.stack,
        );
        throw error;
      }),
    );
  }

  /**
   * Formats the request log message.
   * @param method - The HTTP method of the request.
   * @param url - The URL of the request.
   * @param ip - The IP address of the client.
   * @param userAgent - The User-Agent header from the request.
   * @returns A formatted log message.
   */
  private formatRequestLog(
    method: string,
    url: string,
    ip: string,
    userAgent: string,
  ): string {
    return `Incoming Request: Method=${method}, URL=${url}, IP=${ip}, User-Agent=${userAgent}`;
  }

  /**
   * Formats the response log message.
   * @param method - The HTTP method of the request.
   * @param url - The URL of the request.
   * @param duration - The duration of the request in milliseconds.
   * @returns A formatted log message.
   */
  private formatResponseLog(
    method: string,
    url: string,
    duration: number,
  ): string {
    return `Outgoing Response: Method=${method}, URL=${url}, Duration=${duration}ms`;
  }

  /**
   * Formats the error log message.
   * @param method - The HTTP method of the request.
   * @param url - The URL of the request.
   * @param duration - The duration of the request in milliseconds.
   * @param errorMessage - The error message.
   * @returns A formatted log message.
   */
  private formatErrorLog(
    method: string,
    url: string,
    duration: number,
    errorMessage: string,
  ): string {
    return `Request Failed: Method=${method}, URL=${url}, Duration=${duration}ms, Error=${errorMessage}`;
  }
}
