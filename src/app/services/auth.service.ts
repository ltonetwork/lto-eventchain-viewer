import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { take, shareReplay, map } from 'rxjs/operators';
import { LTO, Account } from 'lto-api';

export interface User {
  name: string;
  email: string;
  seed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _LOCALSTORAGE_KEY = '_users';
  user$: Observable<any>;
  account$: Observable<Account>;

  authenticated$: Observable<boolean>;

  private _user$: BehaviorSubject<any> = new BehaviorSubject(null);
  private _account$: Subject<Account> = new Subject();

  private ltoApi: LTO;

  constructor() {
    this.ltoApi = new LTO();

    this.user$ = this._user$.pipe(shareReplay(1));
    this.account$ = this._account$.pipe(shareReplay(1));
    this.authenticated$ = this._user$.pipe(map(user => !!user));

    this.account$.subscribe();
    this.user$.subscribe();
  }

  login(email: string, password: string) {
    const user = this._getUser(email);
    if (!user) {
      throw 'No email found';
    }

    const seed = this.ltoApi.decryptSeedPhrase(user.seed, password);
    const account = this.ltoApi.createAccountFromExistingPhrase(seed);

    this._account$.next(account);
    this._user$.next(user);
  }

  register(name: string, email: string, password: string, seed?: string) {
    const account = seed
      ? this.ltoApi.createAccountFromExistingPhrase(seed)
      : this.ltoApi.createAccount(5);

    const user: User = {
      name,
      email,
      seed: account.encryptSeed(password)
    };

    this._saveUser(user);
    return this.login(email, password);
  }

  getRegisteredEmails() {
    return Object.keys(this._getUsers());
  }

  addIdentity(chainId: string, identityId: string) {
    this.user$.pipe(take(1)).subscribe(user => {
      user.identities[chainId] = identityId;
    });
  }

  private _getUsers(): { [email: string]: any } {
    const usersJSONString = localStorage.getItem(this._LOCALSTORAGE_KEY) || '{}';
    return JSON.parse(usersJSONString);
  }

  private _getUser(email: string): User | null {
    const users = this._getUsers();
    return users[email] || null;
  }

  private _saveUser(user: any) {
    const users = this._getUsers();
    users[user.email] = user;
    localStorage.setItem(this._LOCALSTORAGE_KEY, JSON.stringify(users));
    this._user$.next(user);
  }
}
