import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { HTTPSignature } from 'lto-api';

@Injectable()
export class SignInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._auth.account$.pipe(
      switchMap(account => {
        const date = new Date().toUTCString();
        const method = req.method.toLowerCase();
        const path = req.url;

        const signature = new HTTPSignature({
          '(request-target)': `${method} ${path}`,
          'x-date': date
        });
        const signatureHeader = signature.signWith(account).getSignature();

        return next.handle(
          req.clone({
            setHeaders: {
              authorization: `signature ${signatureHeader}`,
              'x-date': date
            }
          })
        );
      })
    );
  }
}
