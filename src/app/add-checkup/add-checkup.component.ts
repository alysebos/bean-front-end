import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Pet } from '../pet';

@Component({
  selector: 'app-add-checkup',
  templateUrl: './add-checkup.component.html',
  styleUrls: ['./add-checkup.component.css']
})
export class AddCheckupComponent implements OnInit {

  petId: string = this.route.snapshot.params['id'];
  pet: Pet;
  form: FormGroup;
  prescriptions: FormArray;
  vaccines: FormArray;
  treatments: FormArray;
  message: string;

  constructor(
    private server: ServerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)
    this.server.request('GET', `/pets/${this.petId}`, headers)
      .subscribe((pet: Pet) => { this.pet = pet });
    
    this.form = this.fb.group({
      date: ['', Validators.required],
      vet: [false],
      weight: ['', Validators.required],
      temperatureInput: [false],
      temperature: [''],
      pulseInput: [false],
      pulse: [''],
      respirationInput: [false],
      respiration: [''],
      abdomenInput: [false],
      abdomen: [''],
      legsInput: [false],
      legs: [''],
      feetInput: [false],
      feet: [''],
      jointsInput: [false],
      joints: [''],
      genitalsInput: [false],
      genitals: [''],
      anusInput: [false],
      anus: [''],
      earsInput: [false],
      ears: [''],
      eyesInput: [false],
      eyes: [''],
      mouthInput: [false],
      mouth: [''],
      coatInput: [false],
      coat: [''],
      wasteInput: [false],
      waste: [''],
      clawsInput: [false],
      claws: [''],
      temperamentInput: [false],
      temperament: [''],
      dietInput: [false],
      diet: [''],
      wasteHabitsInput: [false],
      wasteHabits: [''],
      energyLevelInput: [false],
      energyLevel: [''],
      miscNotes: ['']
    });
  }

  get date() { return this.form.get('date') };
  get vet() { return this.form.get('vet') };
  get weight() { return this.form.get('weight') };
  get temperatureInput() { return this.form.get('temperatureInput') };
  get pulseInput() { return this.form.get('pulseInput') };
  get respirationInput() { return this.form.get('respirationInput') };
  get abdomenInput() { return this.form.get('abdomenInput') };
  get legsInput() { return this.form.get('legsInput') };
  get feetInput() { return this.form.get('feetInput') };
  get jointsInput() { return this.form.get('jointsInput') };
  get genitalsInput() { return this.form.get('genitalsInput') };
  get anusInput() { return this.form.get('anusInput') };
  get earsInput() { return this.form.get('earsInput') };
  get eyesInput() { return this.form.get('eyesInput') };
  get mouthInput() { return this.form.get('mouthInput') };
  get coatInput() { return this.form.get('coatInput') };
  get wasteInput() { return this.form.get('wasteInput') };
  get clawsInput() { return this.form.get('clawsInput') };
  get temperamentInput() { return this.form.get('temperamentInput') };
  get dietInput() { return this.form.get('dietInput') };
  get wasteHabitsInput() { return this.form.get('wasteHabitsInput') };
  get energyLevelInput() { return this.form.get('energyLevelInput') };

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');

    let correctDate = this.date.value.split("-");
    let correctDateYear = correctDate[0];
    let correctDateMonth = correctDate[1];
    let correctDateDay = correctDate[2];
    let submitDate = new Date(correctDateYear, correctDateMonth, correctDateDay);
    console.log(submitDate);

    let requestObject = {
      date: this.date.value,
      vet: this.vet.value,
      pet: this.petId,
      weight: this.form.get('weight').value,
      temperature: this.form.get('temperature').value,
      pulse: this.form.get('pulse').value,
      respiration: this.form.get('respiration').value,
      abdomen: this.form.get('abdomen').value,
      legs: this.form.get('legs').value,
      feet: this.form.get('feet').value,
      joints: this.form.get('joints').value,
      genitals: this.form.get('genitals').value,
      anus: this.form.get('anus').value,
      ears: this.form.get('ears').value,
      eyes: this.form.get('eyes').value,
      mouth: this.form.get('mouth').value,
      coat: this.form.get('coat').value,
      waste: this.form.get('waste').value,
      claws: this.form.get('claws').value,
      temperament: this.form.get('temperament').value,
      diet: this.form.get('diet').value,
      wasteHabits: this.form.get('wasteHabits').value,
      energyLevel: this.form.get('energyLevel').value,
      miscNotes: this.form.get('miscNotes').value
    };
    const request = this.server.request('POST', '/checkups', requestObject);

    request
      .subscribe((response) => {
        this.router.navigate([`/pets/${this.petId}`]);
      },
      error => {
        this.handleError(error);
      })
  
  }

  handleError (error) {
    console.log(error.error);
  }

}
