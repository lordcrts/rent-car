import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [CarsComponent, CarDetailComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SwiperModule
  ]
})
export class CarsModule { }
