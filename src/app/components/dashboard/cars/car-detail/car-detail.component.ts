import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { Car } from 'src/app/core/models/car.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { getCarDetailSelector, startStopLoadingSelector } from 'src/app/shared/store/shared.selector';
import { setCarDetail, startStopLoading } from 'src/app/shared/store/shared.actions';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.sass']
})
export class CarDetailComponent implements OnInit, OnDestroy {
  routerSuscription!: Subscription;
  carDetail$!: Observable<Car>
  headerItems: any[] = [];
  loadCars:boolean = true;
  dues:number[]= [1,2,3,4,5,6];
  selectedDue:any;
  loadingState!: Observable<any>
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
  constructor(private router: Router, private store: Store<AppState>) {
    this.routerSuscription = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.carDetail$ = this.store.select(getCarDetailSelector)
        this.loadingState = this.store.select(startStopLoadingSelector)
        this.getCarDetail(event.url.split('/')[2])
      }
    });
    this.headerItems = [
      { label: 'Descripción', icon: 'pi pi-fw pi-home' },
      { label: 'Especificaciones', icon: 'pi pi-fw pi-calendar' },
      { label: 'Precio', icon: 'pi pi-fw pi-money-bill' },
      { label: 'Más imágenes', icon: 'pi pi-fw pi-images' },
    ];
  }

  getCarDetail(url_slug:string){
    this.store.dispatch(setCarDetail({url_slug:url_slug}));
    this.carDetail$.subscribe(data => {
      if(data){
        if(data.id){
        }else{
          this.router.navigate(['/'])
        }
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSuscription.unsubscribe()
  }

  returnImage(d:number){
    return this.randomImage[d-1] 
  }

}
