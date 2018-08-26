import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRestaurantComponent } from './form-restaurant.component';

describe('FormRestaurantComponent', () => {
  let component: FormRestaurantComponent;
  let fixture: ComponentFixture<FormRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
