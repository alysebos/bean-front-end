import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet;
  petId: string = this.route.snapshot.params['id'];
  checkups = [];

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)
    this.server.request('GET', `/pets/${this.petId}`, headers)
      .subscribe(
        (pet: Pet) => { this.pet = pet }
      );
    this.server.request('GET', `/checkups/${this.petId}`, headers)
      .subscribe(
        (checkups: object) => { 
          this.checkups = checkups['checkups'];
          this.checkups = this.checkups.sort((a, b) => {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
          });
        }
      );
  }

  getHighlights (array) {
    let highlights = [];
    for (let i = 0; i < array.length; i++) {
      if (Object.keys(array[i]).length > 1) {
        for (let j = 0; j < Object.keys(array[i]).length; j++) {
          if (Object.keys(array[i])[j] !== "_id") {
            let key = Object.keys(array[i])[j];
            if(array[i][key].highlight) {
              highlights.push(`${array[i][key].value}`);
            };
          }
        }
      };
    }
    return highlights;
  }

  getWeight (checkup) {
    let weight: number;
    for (let i = 0; i < checkup.physical.length; i++) {
      if ('weight' in checkup.physical[i]) {
        return checkup.physical[i].weight.value;
      }
    }
  }

  linkToCheckup(id) {
    this.router.navigateByUrl(`/checkup/${id}`);
  }

}
