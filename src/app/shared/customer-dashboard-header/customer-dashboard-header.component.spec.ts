import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardHeaderComponent } from './customer-dashboard-header.component';

describe('CustomerDashboardHeaderComponent', () => {
  let component: CustomerDashboardHeaderComponent;
  let fixture: ComponentFixture<CustomerDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDashboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
