import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProductComponent } from './send-product.component';

describe('SendProductComponent', () => {
  let component: SendProductComponent;
  let fixture: ComponentFixture<SendProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
