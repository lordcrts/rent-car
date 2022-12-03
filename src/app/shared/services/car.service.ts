import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map, Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>("./assets/cars.json")
      .pipe(
        map(x => x.sort(
          (a, b) => a.brand.localeCompare(b.brand))
        )
        , delay(1000)
      );
  }

  getCarsByBrand(brand: string): Observable<Car[]> {
    return this.http.get<Car[]>("./assets/cars.json")
      .pipe(
        map(x => x.filter(
          x => x.brand.toLowerCase().includes(brand.toLowerCase()))
        ),
        map(x => x.sort(
          (a, b) => a.brand.localeCompare(b.brand))
        )
        , delay(1000)
      );
  }

  getCarByModel(url_slug: string): Observable<Car | any> {
    return this.http.get<Car[]>("./assets/cars.json")
      .pipe(
        map(x => x.find(
          x => x.url_slug === url_slug)
          ),
        delay(1000)
      );
  }
}