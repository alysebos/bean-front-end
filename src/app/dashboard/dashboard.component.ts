import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  firstName: string;
  email: string;
  pets = [];

  constructor(
    private server: ServerService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)

    this.server.request('GET', '/users', headers)
      .subscribe(
        (user: any) => {
          if (user) {
            this.firstName = user.firstName;
            this.email = user.email;
          }
        }
      );
    
    this.server.request('GET', '/pets', headers)
        .subscribe(
          (pets: any) => {
            if (pets) {
              this.pets = pets.pets;
              console.log(pets.pets);
            }
          }
        );
  }

  onLogout() {
    this.app.onLogout();
  }

}
