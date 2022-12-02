import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars.component';

const routes: Routes = [
  
      {
        path: '',
        component: CarsComponent
      },
      {
        path:':url_slug',
        component:CarDetailComponent
      }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
