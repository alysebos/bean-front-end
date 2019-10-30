import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  public formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public server: ServerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: ['', Validators.required]
    });

    if (this.server.isLoggedIn) {
      this.router.navigateByUrl('dashboard');
    }
  }

  get email() { return this.form.get('email') };
  get password() { return this.form.get('password') };

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        this.authService.login(this.form.value);
        // TO DO: Find a better way to display the credentials error;
        // Currently, it shows even if the login is valid while it waits for the reroute.
        // The timeout is a temporary patch.
        setTimeout(() => {this.formSubmitAttempt = true}, 500);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
