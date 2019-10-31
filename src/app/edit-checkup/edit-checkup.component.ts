import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../pet';

@Component({
  selector: 'app-edit-checkup',
  templateUrl: './edit-checkup.component.html',
  styleUrls: ['./edit-checkup.component.css']
})
export class EditCheckupComponent implements OnInit {
  pet: Pet;
  checkupId: string = this.route.snapshot.params['id'];
  checkup;
  form: FormGroup;
  formattedDate;
  message: string;

  constructor(
    private server: ServerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${localStorage.getItem('authToken')}`)
    this.server.request('GET', `/checkups/detail/${this.checkupId}`, headers)
      .subscribe((checkup) => {
        this.checkup = checkup;
        let doo = new Date(this.checkup.date);
        this.formattedDate = new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 ).toISOString().split('T')[0];
        this.server.request('GET', `/pets/${this.checkup.pet}`, headers)
          .subscribe((pet: Pet) => {
            this.pet = pet;
            this.form = this.fb.group({
              date: [this.formattedDate, Validators.required],
              vet: [this.checkup.vet],
              weight: [this.checkup.weight, Validators.required],
              temperatureInput: [this.hasValue('temperature')],
              temperature: [this.checkup.temperature],
              pulseInput: [this.hasValue('pulse')],
              pulse: [this.checkup.pulse],
              respirationInput: [this.hasValue('respiration')],
              respiration: [this.checkup.respiration],
              abdomenInput: [this.hasValue('abdomen')],
              abdomen: [this.checkup.abdomen],
              legsInput: [this.hasValue('legs')],
              legs: [this.checkup.legs],
              feetInput: [this.hasValue('feet')],
              feet: [this.checkup.feet],
              jointsInput: [this.hasValue('joints')],
              joints: [this.checkup.joints],
              genitalsInput: [this.hasValue('genitals')],
              genitals: [this.checkup.genitals],
              anusInput: [this.hasValue('anus')],
              anus: [this.checkup.anus],
              earsInput: [this.hasValue('ears')],
              ears: [this.checkup.ears],
              eyesInput: [this.hasValue('eyes')],
              eyes: [this.checkup.eyes],
              mouthInput: [this.hasValue('mouth')],
              mouth: [this.checkup.mouth],
              coatInput: [this.hasValue('coat')],
              coat: [this.checkup.coat],
              wasteInput: [this.hasValue('waste')],
              waste: [this.checkup.waste],
              clawsInput: [this.hasValue('claws')],
              claws: [this.checkup.claws],
              temperamentInput: [this.hasValue('temperament')],
              temperament: [this.checkup.temperament],
              dietInput: [this.hasValue('diet')],
              diet: [this.checkup.diet],
              wasteHabitsInput: [this.hasValue('wasteHabits')],
              wasteHabits: [this.checkup.wasteHabits],
              energyLevelInput: [this.hasValue('energyLevel')],
              energyLevel: [this.checkup.energyLevel],
              miscNotes: [this.checkup.miscNotes]
            })
          })
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

  hasValue(key) {
    if (this.checkup[key].length > 0) {
      return true;
    }
    return false;
  }

  findValue(key) {
    let inputValue = key + 'Input';
    if (this[inputValue].value) {
      return this.form.get(key).value;
    }
    return '';
  }
  
  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');
    const request = this.server.request('PUT', `/checkups/${this.checkupId}`, {
      id: this.checkupId,
      pet: this.pet._id,
      owner: this.pet.owner,
      date: this.date.value,
      vet: this.vet.value,
      weight: this.form.get('weight').value,
      temperature: this.findValue('temperature'),
      pulse: this.findValue('pulse'),
      respiration: this.findValue('respiration'),
      abdomen: this.findValue('abdomen'),
      legs: this.findValue('legs'),
      feet: this.findValue('feet'),
      joints: this.findValue('joints'),
      genitals: this.findValue('genitals'),
      anus: this.findValue('anus'),
      ears: this.findValue('ears'),
      eyes: this.findValue('eyes'),
      mouth: this.findValue('mouth'),
      coat: this.findValue('coat'),
      waste: this.findValue('waste'),
      claws: this.findValue('claws'),
      temperament: this.findValue('temperament'),
      diet: this.findValue('diet'),
      wasteHabits: this.findValue('wasteHabits'),
      energyLevel: this.findValue('energyLevel'),
      miscNotes: this.form.get('miscNotes').value
    });

    request
      .subscribe(() => {
        this.router.navigate([`/checkup/${this.checkupId}`]);
        },
        error => {
          this.handleError(error);
        })
  
  }

  handleError (error) {
    this.message = error.error.message;
  }

}
