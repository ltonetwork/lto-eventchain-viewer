import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { HTTPSignature, Request } from 'lto-api';

@Injectable()
export class SignInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._auth.account$.pipe(
      switchMap(account => {
        const date = new Date().toUTCString();
        const method = req.method.toLowerCase();
        const path = req.url;

        const headers = {
          'x-date': date
        };

        const ltoReq = new Request(path, method, headers);
        const signature = new HTTPSignature(ltoReq, ['(request-target)', 'x-date']);

        const signatureHeader = signature.signWith(account);

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
