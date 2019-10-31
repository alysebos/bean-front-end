import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(
    private server: ServerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [ 
        Validators.required
      ]],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      weightUnits: ['', Validators.required],
      birthDate: ['', Validators.required]
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
    const request = this.server.request('POST', '/pets', {
      name: this.form.get('name').value,
      species: this.form.get('species').value,
      breed: this.form.get('breed').value,
      weightUnits: this.form.get('weightUnits').value,
      birthDate: this.form.get('birthDate').value
    });

    request
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
        },
        error => {
          this.handleError(error);
        })
  
  }

  handleError (error) {
    this.message = error.error.message;
  }

}
