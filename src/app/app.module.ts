import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SpinnerInterceptor } from './core/interceptor/spinner.interceptor.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './shared/store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './shared/store/shared.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    StoreModule.forRoot(
      appReducer
    ),
    EffectsModule.forRoot([SharedEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
