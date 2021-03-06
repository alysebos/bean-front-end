import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.email, 
        Validators.required
      ]],
      firstName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });

    if (this.server.isLoggedIn) {
      this.router.navigateByUrl('dashboard');
    }
  }

  get email() { return this.form.get('email') };
  get firstName() { return this.form.get('firstName') };
  get password() { return this.form.get('password') };

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');
    const request = this.server.request('POST', '/users', {
      email: this.form.get('email').value,
      firstName: this.form.get('firstName').value,
      password: this.form.get('password').value
    });

    request
    .subscribe(() => {
      this.router.navigate(['/login']);
      },
      error => {
        this.handleError(error);
      })
  }

  handleError (error) {
    this.message = error.error.message;
  }

}
