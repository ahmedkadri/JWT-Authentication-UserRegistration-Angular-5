import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistraionComponent } from './user/registraion/registraion.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/user/login',pathMatch: 'full'
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistraionComponent },
      { path: 'login', component: LoginComponent }  
    ]
  },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
