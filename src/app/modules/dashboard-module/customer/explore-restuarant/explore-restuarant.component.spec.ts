import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreRestuarantComponent } from './explore-restuarant.component';

describe('ExploreRestuarantComponent', () => {
  let component: ExploreRestuarantComponent;
  let fixture: ComponentFixture<ExploreRestuarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreRestuarantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreRestuarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
