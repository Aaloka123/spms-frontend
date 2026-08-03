import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponents } from './product';

describe('ProductComponents', () => {
  let component: ProductComponents;
  let fixture: ComponentFixture<ProductComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
