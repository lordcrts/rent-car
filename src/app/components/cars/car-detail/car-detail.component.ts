import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CarService } from 'src/app/shared/services/car.service';
import { NavigationEnd , Router, Event as NavigationEvent } from '@angular/router';
import { Car } from 'src/app/core/models/car.model';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.sass']
})
export class CarDetailComponent implements OnInit, OnDestroy {
  routerSuscription!:Subscription;
  carDetail$!: Observable<Car>
  constructor(private router: Router, private carService:CarService) {
    this.routerSuscription = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd ) {
        console.log(event.url.split('/')[1])
        this.carDetail$ = this.carService.getCarByModel(event.url.split('/')[1]);
        this.carDetail$.subscribe(data => {
          console.log(data)
          if(!data){
            this.router.navigate(['/'])
          }
        })
      }
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSuscription.unsubscribe()
  }

}
