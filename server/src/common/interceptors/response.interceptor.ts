import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((responseData) => {
        const response = context.switchToHttp().getResponse();
        const message = responseData?.message || 'Request successful';
        const data = responseData?.data || responseData;

        return {
          statusCode: response.statusCode,
          message,
          data,
        };
      }),
    );
  }
}
