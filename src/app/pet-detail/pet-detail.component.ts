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

  getAttributes (checkup) {
    let recordedAttributes = [];
    let allAttributes = Object.keys(checkup);
    for (let i = 0; i < allAttributes.length; i++) {
      if (allAttributes[i] === '_id' || 
        allAttributes[i] === 'date' || 
        allAttributes[i] === 'vet' || 
        allAttributes[i] === 'pet' || 
        allAttributes[i] === 'weight' || 
        allAttributes[i] === 'owner' || 
        allAttributes[i] === '__v') {
      }
      else if (checkup[allAttributes[i]].length > 0) {
        recordedAttributes.push(allAttributes[i]);
      }
    }
    for (let i = 0; i < recordedAttributes.length; i++) {
      let attribute = recordedAttributes[i];
      recordedAttributes[i] = this.renameMap[attribute];
    }
    return recordedAttributes;
  }

  renameMap = {
    weight: 'Weight',
    temperature: 'Temperature',
    pulse: 'Pulse',
    respiration: 'Respiration',
    abdomen: 'Abdomen',
    legs: 'Legs',
    feet: 'Feet',
    joints: 'Joints',
    genitals: 'Genitals',
    anus: 'Anus',
    ears: 'Ears',
    eyes: 'Eyes',
    mouth: 'Mouth',
    coat: 'Coat',
    waste: 'Waste',
    claws: 'Claws',
    temperament: 'Temperament',
    diet: 'Diet',
    wasteHabits: 'Waste Habits',
    energyLevel: 'Energy Level'
  }

  linkToCheckup(id) {
    this.router.navigateByUrl(`/checkup/${id}`);
  }

}
