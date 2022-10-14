import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestuaratComponent } from './add-restuarat.component';

describe('AddRestuaratComponent', () => {
  let component: AddRestuaratComponent;
  let fixture: ComponentFixture<AddRestuaratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestuaratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestuaratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
