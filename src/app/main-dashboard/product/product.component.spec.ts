import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCardComponent} from './product.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Store, StoreModule} from "@ngrx/store";
import {sucessLoad} from "../actions/dashboard-actions";
import {mockProduct, mockProducts} from "../../products.mock";
import * as fromDashboard from "../reducers/dashboard-reducer";
import * as fromCart from "../../cart/reducer/cart-reducer";
import {State} from "../reducers/dashboard-reducer";

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({[fromDashboard.productKey]: fromDashboard.reducer})],
      declarations: [ProductCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    store = TestBed.get(Store);
    store.dispatch(sucessLoad({payload: mockProducts}));
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
