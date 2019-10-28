import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServerService } from './server.service';

@Injectable()

export class AuthService {
  private loggedIn: boolean;
  private authToken: string;

  constructor(
    private router: Router,
    private server: ServerService
  ) {
    console.log('Auth Service');
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.authToken = user.authToken;
      this.server.setLoggedIn(true, this.authToken);
    }
  }

  login(user) {
    if (user.email !== '' && user.password !== '') {
      return this.server.request('POST', '/auth/login', {
        email: user.email,
        password: user.password
      })
      .subscribe((response: any) => {
        if (response.authToken) {
          this.authToken = response.authToken;
          this.server.setLoggedIn(true, this.authToken);
          const userData = {
            authToken: this.authToken
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigateByUrl('dashboard');
        }
      },
      error => {
        this.loggedIn = false;
      });
    }
  }

  logout() {
    this.server.setLoggedIn(false, undefined);
    delete this.authToken;

    localStorage.clear();
    this.router.navigate(['/']);
  }
}
