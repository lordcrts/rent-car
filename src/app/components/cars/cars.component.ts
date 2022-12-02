import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { AppState } from 'src/app/shared/store/app.state';
import { setCars, setCarsByBrand, startStopLoading } from 'src/app/shared/store/shared.actions';
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
  constructor(private store: Store<AppState>,) { }
  
  ngOnInit(): void {
    this.loadingState = this.store.select(startStopLoadingSelector)
    this.carsState =  this.store.select(getCarsSelector)
    this.carsByBrandState = this.store.select(getCarsByBrandSelector)
    this.getCars()
  }

  getCars(){
    this.store.dispatch(setCars());
    this.store.dispatch(startStopLoading({loading:true}));
    this.carsState.subscribe(data => {
      if(data){
        this.cars = data
        this.store.dispatch(startStopLoading({loading:false}));
      }
      
    })
  }

  getSearch(search: any) {
    this.store.dispatch(setCarsByBrand({brand:search}));
    this.store.dispatch(startStopLoading({loading:true}));
    this.carsByBrandState.subscribe(data => {
      if(data){
        this.cars = data
      }
    })
  }

  ngOnDestroy(): void {
    
  }

}
