import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarService } from 'src/app/shared/services/car.service';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    CarsComponent, 
    CarDetailComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SwiperModule,
    SharedModule,
    CardModule
  ],
  providers:[CarService]
})
export class CarsModule { }
