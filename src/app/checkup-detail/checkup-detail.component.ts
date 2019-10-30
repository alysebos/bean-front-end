import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../pet';
import { ServerService } from '../server.service';
import { CheckupAttributesService } from '../checkup-attributes.service';

@Component({
  selector: 'app-checkup-detail',
  templateUrl: './checkup-detail.component.html',
  styleUrls: ['./checkup-detail.component.css']
})
export class CheckupDetailComponent implements OnInit {
  pet: Pet;
  petId: string;
  checkup: any;
  checkupId: string = this.route.snapshot.params['id'];
  attributesRecorded: any[];
  deleteWarning = false;

  constructor(
    private route: ActivatedRoute,
    private server: ServerService,
    public cas: CheckupAttributesService,
    private router: Router
  ) { } 

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)
    this.server.request('GET', `/checkups/detail/${this.checkupId}`, headers)
      .subscribe(checkup => {
        this.petId = checkup['pet'];
        this.checkup = checkup;
        let doo = new Date(this.checkup.date);
        this.checkup.date = new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 );
        this.server.request('GET', `/pets/${this.petId}`)
          .subscribe((pet: Pet) => {
            this.pet = pet;
            let doo = new Date(this.pet.birthDate);
            this.pet.birthDate = new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 );
            this.attributesRecorded = this.cas.getAttributeKeys(this.checkup);
          })
      });
  }

  onDeleteAttempt() {
    this.deleteWarning = true;
  }

  onDelete() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`);
    this.server.request('DELETE', `/checkups/${this.checkup._id}`, headers)
      .subscribe(res => {
        this.router.navigateByUrl(`/pets/${this.petId}`);
      })
  }

}
