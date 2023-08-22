import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { of } from 'rxjs';
import { FakeDataCars } from 'src/app/shared/mocks/cars';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { appReducer } from 'src/app/shared/store/app.state';
import { SHARED_STATE_NAME } from 'src/app/shared/store/shared.selector';
import { SwiperModule } from 'swiper/angular';

import { CarDetailComponent } from './car-detail.component';
const initialState = {
  [SHARED_STATE_NAME]: {
    loading: false,
    cars: FakeDataCars.cars,
    carDetail: FakeDataCars.cars[0]
  }
}
class MockRoute {
  public events = of(new NavigationEnd(0, 'http://localhost:4200/' + FakeDataCars.cars[0].url_slug, 'http://localhost:4200/' + FakeDataCars.cars[0].url_slug));
}
describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailComponent],
      imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        SwiperModule,
        SharedModule,
        CardModule,
        TabViewModule,
        FieldsetModule,
        ImageModule,
        SkeletonModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        NgxSpinnerModule,
        StoreModule.forRoot(appReducer),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRoute },
        TruncatePipe,
        SlugifyPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    debugger
    expect(component).toBeTruthy();
  });
});
