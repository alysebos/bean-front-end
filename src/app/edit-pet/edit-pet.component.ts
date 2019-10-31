import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pet } from '../pet';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  form: FormGroup;
  message: string;
  petId: string = this.route.snapshot.params['id'];
  pet: Pet;
  formattedBday: string;

  constructor(
    private server: ServerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
          this.formattedBday = new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 ).toISOString().split('T')[0];
          this.form = this.fb.group({
            name: [this.pet.name, Validators.required],
            species: [this.pet.species, Validators.required],
            breed: [this.pet.breed, Validators.required],
            weightUnits: [this.pet.weightUnits, Validators.required],
            birthDate: [this.formattedBday, Validators.required]
          });
        });
  }
  
  get name() { return this.form.get('name') };
  get species() { return this.form.get('species') };
  get breed() { return this.form.get('breed') };
  get weightUnits() { return this.form.get('weightUnits') };
  get birthDate() { return this.form.get('birthDate') };

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');
    const request = this.server.request('PUT', `/pets/${this.petId}`, {
      name: this.form.get('name').value,
      species: this.form.get('species').value,
      breed: this.form.get('breed').value,
      weightUnits: this.form.get('weightUnits').value,
      birthDate: this.form.get('birthDate').value,
      id: this.petId
    });

    request
      .subscribe(() => {
        this.router.navigate([`/pets/${this.petId}`]);
        },
        error => {
          this.handleError(error);
        })
  
  }

  handleError (error) {
    this.message = error.error.message;
  }

}
