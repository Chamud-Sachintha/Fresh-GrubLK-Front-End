import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEatablesComponent } from './manage-eatables.component';

describe('ManageEatablesComponent', () => {
  let component: ManageEatablesComponent;
  let fixture: ComponentFixture<ManageEatablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEatablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEatablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
