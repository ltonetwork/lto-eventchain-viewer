import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emails: string[] = [];
  constructor(private _auth: AuthService, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.emails = this._auth.getRegisteredEmails();
  }

  async login(credentials: { email: string; password: string }) {
    try {
      await this._auth.login(credentials.email, credentials.password);
      this._notify('LOGGED IN');
      this.router.navigate(['./']);
    } catch (err) {
      this._notify('INVALID EMAIL/PASSWORD');
    }
  }

  private _notify(message: string) {
    this.snackbar.open(message, 'DISMISS', {
      duration: 1500
    });
  }
}
