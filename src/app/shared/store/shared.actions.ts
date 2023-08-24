
import { createAction, props } from '@ngrx/store';
import { Car } from 'src/app/core/models/car.model';
export const START_STOP_LOADING_ACTION = '[shared state] start / stop loading';
export const STOP_LOADING_ACTION = '[shared state] stop loading';

export const GET_CARS_ACTION = '[shared state] get Cars';

export const SET_CAR_URL_SLUG_ACTION = '[shared state] set Car url slug Detail';
export const GET_CAR_URL_SLUG_ACTION = '[shared state] get Car url slug Detail';

export const SET_CARS_BY_BRAND_ACTION = '[shared state] set Cars By Brand';
export const GET_CARS_BY_BRAND_ACTION = '[shared state] get Cars By Brand';

export const startStopLoading = createAction(
  START_STOP_LOADING_ACTION,
  props<{ loading: boolean }>()
);

export const setCars = createAction(
  GET_CARS_ACTION
);


export const getCars = createAction(
  GET_CARS_ACTION,
  props<{ cars: any }>()
);

export const setCarDetail = createAction(
  SET_CAR_URL_SLUG_ACTION,
  props<{ url_slug:string }>()
);

export const getCarDetail = createAction(
  GET_CAR_URL_SLUG_ACTION,
  props<Car>()
);

export const setCarsByBrand= createAction(
  SET_CARS_BY_BRAND_ACTION,
  props<{ brand__name:string }>()
);

export const getCarsByBrand= createAction(
  GET_CARS_BY_BRAND_ACTION,
  props<{ cars: Car[] }>()
);
