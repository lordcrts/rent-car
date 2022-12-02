import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/shared/services/car.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.sass']
})
export class CarsComponent implements OnInit {
  loadCars:boolean = true;
  cars:Car[] = [];
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay:true
  };
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => { 
      this.cars = data
      this.loadCars = false
    })
  }

  getSearch(search: any) {
    this.loadCars = true
    this.carService.getCarsByBrand(search).subscribe(data => { 
      this.cars = data
      this.loadCars = false
    })
  }

}
