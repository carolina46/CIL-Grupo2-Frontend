import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRestaurantsComponent } from './my-restaurants.component';

describe('MyRestaurantsComponent', () => {
  let component: MyRestaurantsComponent;
  let fixture: ComponentFixture<MyRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
