import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.sass']
})
export class CarsComponent implements OnInit {
  /**
   * 
   */
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },preventInteractionOnTransition	:false
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
