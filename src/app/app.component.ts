import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bean-front-end';
  public firstName;

  constructor (
    private authService: AuthService,
    public server: ServerService
  ) { }

  onLogout() {
    this.authService.logout();
  }

}
