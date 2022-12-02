import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarService } from 'src/app/shared/services/car.service';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    CarsComponent, 
    CarDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarsRoutingModule,
    SwiperModule,
    SharedModule,
    CardModule,
    TabViewModule,
    FieldsetModule,
    ImageModule,
    SkeletonModule,
    DropdownModule,
    ButtonModule
  ],
  providers:[CarService]
})
export class CarsModule { }
