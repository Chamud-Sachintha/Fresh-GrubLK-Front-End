import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEatablesComponent } from './add-eatables.component';

describe('AddEatablesComponent', () => {
  let component: AddEatablesComponent;
  let fixture: ComponentFixture<AddEatablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEatablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEatablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
