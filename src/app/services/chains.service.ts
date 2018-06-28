import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, catchError, map } from 'rxjs/operators';
import { Account } from 'lto-api';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ChainsService {
  private _hostUrl = '';

  chains$: Observable<any>;
  constructor(
    private _auth: AuthService,
    private _http: HttpClient,
    private _snackbar: MatSnackBar
  ) {
    this.chains$ = _auth.account$.pipe(
      switchMap(account => {
        return _http.get(`${this._hostUrl}/api/events/event-chains`);
      }),
      catchError(error => {
        this._snackbar.open('Chains loading error', 'DISMISS', { duration: 3000 });
        throw error;
      }),
      shareReplay(1)
    );
  }

  getChain(id: string): Observable<any> {
    return this.chains$.pipe(map(chains => chains.find(chain => chain.id === id)));
  }
}
