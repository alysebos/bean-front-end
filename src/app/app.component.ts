import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bean-front-end';
  firstName: string;

  constructor (
    private authService: AuthService,
    private router: Router,
    public server: ServerService
  ) { }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)

    if (this.server.isLoggedIn) {
      this.server.request('GET', '/users', headers)
        .subscribe(
          (user: any) => {
            if (user) {
              this.firstName = user.firstName;
            }
          }
        );
    }
  }

}
