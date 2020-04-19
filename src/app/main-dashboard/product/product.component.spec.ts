import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      name: 'Oatmeal',
      description: 'Hot and fluffy oatmeal & protein powder cake',
      price: 330.00,
      image: '../assets/images/oatmeal.jpg',
      limit: 30
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the product to add', () => {
    spyOn(component.productAddEvent, 'emit');
    component.addToCart();
    expect(component.productAddEvent.emit).toHaveBeenCalledWith(component.product);
  });

  it('should emit the product to remove', () => {
    spyOn(component.productRemoveEvent, 'emit');
    component.removeFromCart();
    expect(component.productRemoveEvent.emit).toHaveBeenCalledWith(component.product);
  });
});
