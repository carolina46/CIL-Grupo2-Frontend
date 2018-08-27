import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SaveMenuTypeComponent} from './form-menu-type.component';

describe('SaveMenuTypeComponent', () => {
  let component: SaveMenuTypeComponent;
  let fixture: ComponentFixture<SaveMenuTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMenuTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMenuTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
