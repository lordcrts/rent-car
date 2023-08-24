import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';
import { AppState } from 'src/app/shared/store/app.state';
import { setCars, setCarsByBrand } from 'src/app/shared/store/shared.actions';
import { getCarsByBrandSelector, getCarsSelector, startStopLoadingSelector } from 'src/app/shared/store/shared.selector';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.sass']
})
export class CarsComponent implements OnInit, OnDestroy {
  cars:Car[] = [];
  loadingState!: Observable<any>
  carsState!: Observable<Car[]>
  carsByBrandState!: Observable<Car[]>
  searchState!: Observable<any>
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay:true
  };
  randomImage:any[] = [
    "assets/images/cars/montero.webp",
    "assets/images/cars/passat.jpg",
    "assets/images/cars/l-series.jpg",
    "assets/images/cars/compass.jpg",
    "assets/images/cars/lancer-evolution.jpg",
    "assets/images/cars/suburban.jpg",
    "assets/images/cars/ram-van-b350.jpg",
    "assets/images/cars/ascender.jpg",
    "assets/images/cars/6-series.webp",
    "assets/images/cars/gto.jpg",
  ]
  co = 0
  constructor(private store: Store<AppState>, public carService:CarService) { }
  
  ngOnInit(): void {
    this.loadingState = this.store.select(startStopLoadingSelector)
    this.carsState =  this.store.select(getCarsSelector)
    this.carsByBrandState = this.store.select(getCarsByBrandSelector)
    this.getCars()
  }

  getCars(){
    this.store.dispatch(setCars());
    this.carsState.subscribe(data => {
      if(data){
        let interval = setInterval(() => {
        this.carService._getStatusCars(data).then(d => {
          if(d.status === "RUNNING"){
            console.log(d)
          }else if(d.status == "FAILED"){
            
            clearInterval(interval)
          }
          else{
            if(d['output']){
            this.cars = JSON.parse(d['output'])['body']['results']
            this.cars.forEach((car,index) => {
              car.image = this.randomImage[index]
            })
            console.log(this.cars)
            clearInterval(interval)
          }
          }
        })
        }, 1000)
      }
    })
  }

  getSearch(search: any) {
    this.store.dispatch(setCarsByBrand({brand__name:search}));
    
    this.carsByBrandState.subscribe(data => {
      if(data){
        let interval = setInterval(() => {
        this.carService._getStatusCars(data).then(d => {
          console.log(d)
          if(d.status == "RUNNING"){
            clearInterval(interval)
          }else if(d.status == "FAILED"){
            this.co+=1
            if(this.co > 1){
              this.co = 0
              alert(d.cause)
              clearInterval(interval)
              location.reload()
            }
            
          }
          else{
            if(d['output']){
            this.cars = JSON.parse(d['output'])['body']['results']
            this.cars.forEach((car,index) => {
              car.image = this.randomImage[index]
            })
            clearInterval(interval)
          }
          }
        })
        }, 1000)
      }
    })
  }

  ngOnDestroy(): void {
  }

}
