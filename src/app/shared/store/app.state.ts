
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { SharedReducer } from "./shared.reducer";
import { SHARED_STATE_NAME } from "./shared.selector";
import { SharedState } from "./shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    router: RouterReducerState;
  }
  
  export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    router: routerReducer,
  };