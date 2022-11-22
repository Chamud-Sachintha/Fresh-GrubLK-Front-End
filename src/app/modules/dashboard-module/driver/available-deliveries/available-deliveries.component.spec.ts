import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDeliveriesComponent } from './available-deliveries.component';

describe('AvailableDeliveriesComponent', () => {
  let component: AvailableDeliveriesComponent;
  let fixture: ComponentFixture<AvailableDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableDeliveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
