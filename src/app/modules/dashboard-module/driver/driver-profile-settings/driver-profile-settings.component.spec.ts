import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileSettingsComponent } from './driver-profile-settings.component';

describe('DriverProfileSettingsComponent', () => {
  let component: DriverProfileSettingsComponent;
  let fixture: ComponentFixture<DriverProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverProfileSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
