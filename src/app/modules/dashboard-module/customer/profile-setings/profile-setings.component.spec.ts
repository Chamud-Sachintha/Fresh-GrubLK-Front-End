import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSetingsComponent } from './profile-setings.component';

describe('ProfileSetingsComponent', () => {
  let component: ProfileSetingsComponent;
  let fixture: ComponentFixture<ProfileSetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
