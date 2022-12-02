
import { createReducer, on } from '@ngrx/store';
import { getCarDetail, getCars, getCarsByBrand, startStopLoading } from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(startStopLoading, (state, action) => {
    return {
      ...state,
      loading: action.loading,
    };
  }),
  on(getCars, (state, action) => {
    return {
      ...state,
      cars: action.cars,
    };
  }),
  on(getCarDetail, (state, action) => {
    return {
      ...state,
      carDetail: action,
    };
  }),
  on(getCarsByBrand, (state, action) => {
    return {
      ...state,
      cars: action.cars,
    };
  }),
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
