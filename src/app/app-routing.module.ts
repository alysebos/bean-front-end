import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.service';
import { AddPetComponent } from './add-pet/add-pet.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { AddCheckupComponent } from './add-checkup/add-checkup.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'addpet', component: AddPetComponent, canActivate: [AuthGuard] },
  { path: 'pets/:id', component: PetDetailComponent, canActivate: [AuthGuard] },
  { path: 'addcheckup/:id', component: AddCheckupComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
