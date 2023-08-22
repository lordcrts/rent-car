import { exhaustMap, map, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// import { CarService } from '../services/car.service';
import { getCarDetail, getCars, getCarsByBrand, setCarDetail, setCars, setCarsByBrand, startStopLoading } from './shared.actions';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private carService: CarService,
    ) { }


    startLoading$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(startStopLoading),
                tap((action) => {
                    return startStopLoading(action);
                })
            );
        },
        { dispatch: false }
    );

    setCars$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setCars),
            exhaustMap((action) => {
                let params = {
                    limit: 10,
                    ...action
                }
                return this.carService._getCars(params).then(
                    (carsData) =>{
                        const cars = carsData.results as Car[]
                        return getCars({ cars });
                    }
                )
            })
        );
    });

    getCarDetailByUrlSlug$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setCarDetail),
            exhaustMap((action) => {
                    return this.carService.getCarByModel(action.url_slug).then(
                        (carsData) =>{
                            const cars = carsData as Car
                            return getCarDetail(cars);
                        }
                    )
            })
        );
    });

    getCarsByBrand$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setCarsByBrand),
            exhaustMap((action) => {
                let params = {
                    limit: 10,
                    ...action
                }
                return this.carService._getCars(params).then(
                    (carsData) =>{
                        const cars = carsData.results as Car[]
                        return getCarsByBrand({ cars });
                    }
                )
            })
        );
    });
}
