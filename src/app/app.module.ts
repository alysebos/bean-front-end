import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AboutBeanComponent } from './about-bean/about-bean.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { AddCheckupComponent } from './add-checkup/add-checkup.component';
import { CheckupDetailComponent } from './checkup-detail/checkup-detail.component';
import { CheckupAttributesService } from './checkup-attributes.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AboutBeanComponent,
    AddPetComponent,
    PetDetailComponent,
    AddCheckupComponent,
    CheckupDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CheckupAttributesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
