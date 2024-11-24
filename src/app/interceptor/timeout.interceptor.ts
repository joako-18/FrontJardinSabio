// timeout.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      timeout(10000), // Establece un tiempo límite de 10 segundos
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Error en la solicitud:', error.message);
        }
        return throwError(() => error);
      })
    );
  }
}
