import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate:[LoginGuard],
    loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    canActivate:[LoginGuard],
    loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: '',
    component:DashboardComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./components/dashboard/cars/cars.module').then(m => m.CarsModule)
      }
    ]
    
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
