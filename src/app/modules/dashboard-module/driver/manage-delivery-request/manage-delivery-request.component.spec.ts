import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliveryRequestComponent } from './manage-delivery-request.component';

describe('ManageDeliveryRequestComponent', () => {
  let component: ManageDeliveryRequestComponent;
  let fixture: ComponentFixture<ManageDeliveryRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDeliveryRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeliveryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
