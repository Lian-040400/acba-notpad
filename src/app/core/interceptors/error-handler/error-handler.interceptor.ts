import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = `Error: ${error.error.message}`;
        console.log(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}

export const ErrorHandlerInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlerInterceptor,
  multi: true,
};
