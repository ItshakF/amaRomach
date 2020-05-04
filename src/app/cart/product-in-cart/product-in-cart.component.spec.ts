import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {ProductInCartComponent} from './product-in-cart.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the product to update', () => {
    spyOn(component.productEventPriceUpdate, 'emit');
    component.changePrice(15);
    expect(component.productEventPriceUpdate.emit)
      .toHaveBeenCalledWith({product: component.product, amount: 15});
  });

  it('should emit the product to update', () => {
    spyOn(component.productEventRemoveProduct, 'emit');
    component.removeProduct();
    expect(component.productEventRemoveProduct.emit)
      .toHaveBeenCalledWith(component.product);
  });
});
