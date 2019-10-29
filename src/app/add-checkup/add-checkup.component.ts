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
      weightHighlight: [false],
      weightRemark: [''],
      temperatureInput: [false],
      temperature: [''],
      temperatureHighlight: [false],
      temperatureRemark: [''],
      pulseInput: [false],
      pulse: [''],
      pulseHighlight: [false],
      pulseRemark: [''],
      respirationInput: [false],
      respiration: [''],
      respirationHighlight: [false],
      respirationRemark: [''],
      abdomenInput: [false],
      abdomen: [''],
      abdomenHighlight: [false],
      abdomenRemark: [''],
      legsInput: [false],
      legs: [''],
      legsHighlight: [false],
      legsRemark: [''],
      feetInput: [false],
      feet: [''],
      feetHighlight: [false],
      feetRemark: [''],
      jointsInput: [false],
      joints: [''],
      jointsHighlight: [false],
      jointsRemark: [''],
      genitalsInput: [false],
      genitals: [''],
      genitalsHighlight: [false],
      genitalsRemark: [''],
      anusInput: [false],
      anus: [''],
      anusHighlight: [false],
      anusRemark: [''],
      earsInput: [false],
      ears: [''],
      earsHighlight: [false],
      earsRemark: [''],
      eyesInput: [false],
      eyes: [''],
      eyesHighlight: [false],
      eyesRemark: [''],
      mouthInput: [false],
      mouth: [''],
      mouthHighlight: [false],
      mouthRemark: [''],
      coatInput: [false],
      coat: [''],
      coatHighlight: [false],
      coatRemark: [''],
      wasteInput: [false],
      waste: [''],
      wasteHighlight: [false],
      wasteRemark: [''],
      clawsInput: [false],
      claws: [''],
      clawsHighlight: [false],
      clawsRemark: [''],
      temperamentInput: [false],
      temperament: [''],
      temperamentHighlight: [false],
      temperamentRemark: [''],
      dietInput: [false],
      diet: [''],
      dietHighlight: [false],
      dietRemark: [''],
      wasteHabitsInput: [false],
      wasteHabits: [''],
      wasteHabitsHighlight: [false],
      wasteHabitsRemark: [''],
      energyLevelInput: [false],
      energyLevel: [''],
      energyLevelHighlight: [false],
      energyLevelRemark: [''],
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
    let requestObject = {
      date: this.date.value,
      vet: this.vet.value,
      pet: this.petId,
      physical: [
        { weight: {
          value: this.form.get('weight').value
        }},
        { temperature: {
          value: this.form.get('temperature').value,
          highlight: this.form.get('temperatureHighlight').value,
          remark: this.form.get('temperatureRemark').value
        }},
        { pulse: {
          value: this.form.get('pulse').value,
          highlight: this.form.get('pulseHighlight').value,
          remark: this.form.get('pulseRemark').value
        }},
        { respiration: {
          value: this.form.get('respiration').value,
          highlight: this.form.get('respirationHighlight').value,
          remark: this.form.get('respirationRemark').value
        }},
        { abdomen: {
          value: this.form.get('abdomen').value,
          highlight: this.form.get('abdomenHighlight').value,
          remark: this.form.get('abdomenRemark').value
        }},
        { legs: {
          value: this.form.get('legs').value,
          highlight: this.form.get('legsHighlight').value,
          remark: this.form.get('legsRemark').value
        }},
        { feet: {
          value: this.form.get('feet').value,
          highlight: this.form.get('feetHighlight').value,
          remark: this.form.get('feetRemark').value
        }},
        { joints: {
          value: this.form.get('joints').value,
          highlight: this.form.get('jointsHighlight').value,
          remark: this.form.get('jointsRemark').value
        }},
        { genitals: {
          value: this.form.get('genitals').value,
          highlight: this.form.get('genitalsHighlight').value,
          remark: this.form.get('weightRemark').value
        }},
        { anus: {
          value: this.form.get('anus').value,
          highlight: this.form.get('anusHighlight').value,
          remark: this.form.get('anusRemark').value
        }},
        { ears: {
          value: this.form.get('ears').value,
          highlight: this.form.get('earsHighlight').value,
          remark: this.form.get('earsRemark').value
        }},
        { eyes: {
          value: this.form.get('eyes').value,
          highlight: this.form.get('eyesHighlight').value,
          remark: this.form.get('eyesRemark').value
        }},
        { mouth: {
          value: this.form.get('mouth').value,
          highlight: this.form.get('mouthHighlight').value,
          remark: this.form.get('mouthRemark').value
        }},
        { coat: {
          value: this.form.get('coat').value,
          highlight: this.form.get('coatHighlight').value,
          remark: this.form.get('coatRemark').value
        }},
        { waste: {
          value: this.form.get('waste').value,
          highlight: this.form.get('wasteHighlight').value,
          remark: this.form.get('wasteRemark').value
        }},
        { claws: {
          value: this.form.get('claws').value,
          highlight: this.form.get('clawsHighlight').value,
          remark: this.form.get('clawsRemark').value
        }}
      ],
      nonPhysical: [
        { temperament: {
          value: this.form.get('temperament').value,
          highlight: this.form.get('temperamentHighlight').value,
          remark: this.form.get('temperamentRemark').value
        }},
        { diet: {
          value: this.form.get('diet').value,
          highlight: this.form.get('dietHighlight').value,
          remark: this.form.get('dietRemark').value
        }},
        { wasteHabits: {
          value: this.form.get('wasteHabits').value,
          highlight: this.form.get('wasteHabitsHighlight').value,
          remark: this.form.get('wasteHabitsRemark').value
        }},
        { energyLevel: {
          value: this.form.get('energyLevel').value,
          highlight: this.form.get('energyLevelHighlight').value,
          remark: this.form.get('energyLevelRemark').value
        }}
      ],
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
