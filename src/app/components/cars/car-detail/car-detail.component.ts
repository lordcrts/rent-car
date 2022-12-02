import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CarService } from 'src/app/shared/services/car.service';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { Car } from 'src/app/core/models/car.model';
import { MenuItem } from 'primeng/api';
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
  constructor(private router: Router, private carService: CarService) {
    this.routerSuscription = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.carDetail$ = this.carService.getCarByModel(event.url.split('/')[1]);
        this.carDetail$.subscribe(data => {
          if (!data) {
            this.router.navigate(['/'])
          }else{
            this.loadCars = false 
          }
        })
      }
    });
    this.headerItems = [
      { label: 'Descripción', icon: 'pi pi-fw pi-home' },
      { label: 'Especificaciones', icon: 'pi pi-fw pi-calendar' },
      { label: 'Precio', icon: 'pi pi-fw pi-money-bill' },
      { label: 'Más imágenes', icon: 'pi pi-fw pi-images' },
    ];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSuscription.unsubscribe()
  }

}
