import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'primeng/api';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        CommonModule,
        FormsModule,
        SharedModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'S-001';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.search()
    expect(input.value).toBe('S-001')
    const event = new KeyboardEvent("keyup",{
      "key": "enter"
    });
    input.dispatchEvent(event);
    const clearText = fixture.nativeElement.querySelector('.custom-icon-times');
    clearText.click()
    fixture.detectChanges();
  });

  it('shouldnt search', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.search()
    expect(input.value).toBe('')
    fixture.detectChanges();
  });
});
