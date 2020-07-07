import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSignupComponent } from './brand-signup.component';

describe('BrandSignupComponent', () => {
  let component: BrandSignupComponent;
  let fixture: ComponentFixture<BrandSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
