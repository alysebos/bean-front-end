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

  constructor (
    private authService: AuthService,
    private router: Router,
    private server: ServerService
  ) { }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit () {
  }

}
