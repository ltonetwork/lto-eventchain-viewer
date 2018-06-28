import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private _auth: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  async register(data: { email: string; name: string; password: string; seed: string }) {
    try {
      await this._auth.register(data.name, data.email, data.password, data.seed);
    } catch (err) {
      this._snackbar.open('REGISTRACTION ERROR', 'DISMISS', {
        duration: 1500
      });
    }
    this._snackbar.open('REGISTERED', 'DISMISS', {
      duration: 1500
    });
    this._router.navigate(['/']);
  }
}
