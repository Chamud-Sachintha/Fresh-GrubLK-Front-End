import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProfileSetingsComponent } from './seller-profile-setings.component';

describe('SellerProfileSetingsComponent', () => {
  let component: SellerProfileSetingsComponent;
  let fixture: ComponentFixture<SellerProfileSetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProfileSetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProfileSetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
