import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {ProductInCartComponent} from './product-in-cart.component';
import {mockProduct} from '../../products.mock';

describe('ProductInCartComponent', () => {
  let component: ProductInCartComponent;
  let fixture: ComponentFixture<ProductInCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductInCartComponent,
      ],
      imports: [
        SuiModule,
        FormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInCartComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the product to update', () => {
    spyOn(component.cartUpdateEvent, 'emit');
    component.updateQuantity(15);
    expect(component.cartUpdateEvent.emit)
      .toHaveBeenCalledWith({productName: mockProduct.name, productQuantity: 15});
  });

  it('should emit the product to remove', () => {
    spyOn(component.removeProductEvent, 'emit');
    component.removeProduct();
    expect(component.removeProductEvent.emit)
      .toHaveBeenCalledWith(component.product.name);
  });
});
