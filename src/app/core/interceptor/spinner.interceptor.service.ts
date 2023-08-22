import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { startStopLoading } from 'src/app/shared/store/shared.actions';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private countRequest = 0;
  constructor(
    public spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (!this.countRequest) {
      this.spinner.show();
      this.store.dispatch(startStopLoading({loading:true}));
    }
    this.countRequest++;


    return next.handle(request)
      .pipe(
        finalize(() => {
          this.countRequest--;
          if (!this.countRequest) {
            setTimeout(() => {
              this.spinner.hide();
              this.store.dispatch(startStopLoading({loading:false}));
            }, 1000);
          }
        })
      );
  }
}