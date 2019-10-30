import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../pet';
import { CheckupAttributesService } from '../checkup-attributes.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet;
  petId: string = this.route.snapshot.params['id'];
  checkups: any[];
  deleteWarning = false;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router,
    public cas: CheckupAttributesService
  ) { }

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)
    this.server.request('GET', `/pets/${this.petId}`, headers)
      .subscribe(
        (pet: Pet) => { 
          this.pet = pet;
          let doo = new Date(this.pet.birthDate);
          this.pet.birthDate = new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 );
        }
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
          for (let i = 0; i < this.checkups.length; i++) {
            let doo = new Date(this.checkups[i].date);
            this.checkups[i].date = new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 );
          }
        }
      );
  }

  linkToCheckup(id) {
    this.router.navigateByUrl(`/checkup/${id}`);
  }

  onDeleteAttempt() {
    this.deleteWarning = true;
  }

  onDelete() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`);
    this.server.request('DELETE', `/pets/${this.pet._id}`, headers)
      .subscribe(res => {
        this.router.navigateByUrl('/dashboard');
      })
  }

}
