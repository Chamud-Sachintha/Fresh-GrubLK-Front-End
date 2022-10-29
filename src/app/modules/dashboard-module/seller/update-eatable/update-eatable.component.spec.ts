import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEatableComponent } from './update-eatable.component';

describe('UpdateEatableComponent', () => {
  let component: UpdateEatableComponent;
  let fixture: ComponentFixture<UpdateEatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
