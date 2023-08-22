import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FakeDataCars } from 'src/app/shared/mocks/cars';
import { appReducer, AppState } from 'src/app/shared/store/app.state';
import { SHARED_STATE_NAME } from 'src/app/shared/store/shared.selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CarsComponent } from './cars.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { SwiperModule } from 'swiper/angular';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { SkeletonCardComponent } from 'src/app/shared/components/skeleton-card/skeleton-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';

const initialState = {
  [SHARED_STATE_NAME]: {
    loading: false,
    cars: FakeDataCars.cars,
    carDetail: null
  }
}
describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;
  let mockStore: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CarsComponent,
        SearchComponent,
        SkeletonCardComponent,
        CardComponent,
        TruncatePipe,
        SlugifyPipe
      ],
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
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
        StoreModule.forRoot(appReducer),
      ],
      providers: [
        provideMockStore({ initialState }),
        TruncatePipe,
        SlugifyPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cars defined', () => {
    expect(component.cars).toBe(FakeDataCars.cars);
  });

  it('should search by brand', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Mitsubishi';
    input.dispatchEvent(new Event('input'));
    const clickSearch = fixture.nativeElement.querySelector('.pi-search')
    clickSearch.click()
    const initialState = {
      [SHARED_STATE_NAME]: {
        loading: false,
        cars: FakeDataCars.cars.filter(
          x => x.brand.toLowerCase().includes(input.value.toLowerCase())),
        carDetail: null
      }
    }
    mockStore.setState(initialState);
    fixture.detectChanges();
    expect(component.cars.length).toBeGreaterThan(2)
  }));
});

