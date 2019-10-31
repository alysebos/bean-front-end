import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.service';
import { AddPetComponent } from './add-pet/add-pet.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { AddCheckupComponent } from './add-checkup/add-checkup.component';
import { CheckupDetailComponent } from './checkup-detail/checkup-detail.component';
import { EditCheckupComponent } from './edit-checkup/edit-checkup.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'addpet', component: AddPetComponent, canActivate: [AuthGuard] },
  { path: 'pets/:id', component: PetDetailComponent, canActivate: [AuthGuard] },
  { path: 'addcheckup/:id', component: AddCheckupComponent, canActivate: [AuthGuard] },
  { path: 'checkup/:id', component: CheckupDetailComponent, canActivate: [AuthGuard] },
  { path: 'editcheckup/:id', component: EditCheckupComponent, canActivate: [AuthGuard] },
  { path: 'editpet/:id', component: EditPetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
