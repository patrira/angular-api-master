import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add a mock authentication token to headers
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer mock-auth-token')
    });

    // Log outgoing request and incoming responses
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('Response:', event);
        }
      }, error => {
        console.error('Error:', error);
      })
    );
  }
}
