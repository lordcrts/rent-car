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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CreateComponent } from './create/create.component';
import { InputTextModule } from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
@NgModule({
  declarations: [
    CarsComponent, 
    CarDetailComponent, 
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarsRoutingModule,
    SwiperModule,
    SharedModule,
    CardModule,
    TabViewModule,
    FieldsetModule,
    ImageModule,
    SkeletonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    FileUploadModule
  ],
  providers:[CarService]
})
export class CarsModule { }
