import { Car } from "src/app/core/models/car.model";


export interface SharedState {
    loading: boolean;
    cars:Car[] | any[]
    carDetail:Car | any
  }

  export const initialState: SharedState = {
    loading: false,
    cars: [],
    carDetail: null
  };
