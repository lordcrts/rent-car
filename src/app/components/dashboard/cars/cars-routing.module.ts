import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  
      {
        path: '',
        component: CarsComponent,
      },
      {
        path:'detail/:url_slug',
        component:CarDetailComponent
      },
      {
        path:'create',
        component:CreateComponent
      }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
