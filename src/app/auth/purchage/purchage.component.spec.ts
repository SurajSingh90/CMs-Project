import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchageComponent } from './purchage.component';

describe('PurchageComponent', () => {
  let component: PurchageComponent;
  let fixture: ComponentFixture<PurchageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
