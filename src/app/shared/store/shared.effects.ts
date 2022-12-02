import { exhaustMap, map, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CarService } from '../services/car.service';
import { getCarDetail, getCars, getCarsByBrand, setCarDetail, setCars, setCarsByBrand, startStopLoading } from './shared.actions';
import { Car } from 'src/app/core/models/car.model';

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
                return this.carService.getCars()
                    .pipe(
                        map((cars: Car[]) => {
                            return getCars({ cars });
                        })
                    );
            })
        );
    });

    getCarDetailByUrlSlug$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setCarDetail),
            exhaustMap((action) => {
                return this.carService.getCarByModel(action.url_slug)
                    .pipe(
                        map((cars: Car) => {
                            return getCarDetail(cars);
                        })
                    );
            })
        );
    });

    getCarsByBrand$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setCarsByBrand),
            exhaustMap((action) => {
                return this.carService.getCarsByBrand(action.brand)
                    .pipe(
                        map((cars: Car[]) => {
                            return getCarsByBrand({ cars });
                        })
                    );
            })
        );
    });
}
