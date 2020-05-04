import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalComponent} from './modal.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreModule, Store, ReducerManager, ReducerManagerDispatcher} from '@ngrx/store';
import * as fromDashboard from '../../main-dashboard/reducers/dashboard-reducer';
import {mockProduct, mockProducts} from '../../products.mock';
import {Product} from 'src/app/model/product.model';
import {addProduct, resetCart, checkout} from '../actions/cart-actions';
import {updateQuantity} from '../actions/cart-actions';
import * as fromCart from "../reducer/cart-reducer";
import {State} from "../../main-dashboard/reducers/dashboard-reducer";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {CartState, ProductInCart} from "../reducer/cart-reducer";
import {sucessLoad} from "../../main-dashboard/actions/dashboard-actions";

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let spy;
  let store: Store<State>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [
        StoreModule.forRoot({
          [fromDashboard.productKey]: fromDashboard.reducer,
          [fromCart.cartKey]: fromCart.reducer
        }), BrowserDynamicTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    spy = spyOn(TestBed.get(Store), 'dispatch').and.callThrough();
    store = TestBed.get(Store);
    store.dispatch(sucessLoad({payload: mockProducts}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update quantity', () => {
    store.dispatch(addProduct({product: mockProduct}));
    const action = updateQuantity({updateProduct: {productName: mockProduct.name, productQuantity: 5}});
    component.updatePrice({product: mockProduct, amount: 5});

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should activate checkout', () => {
    store.dispatch(addProduct({product: mockProduct}));
    store.dispatch(updateQuantity({updateProduct: {productName: mockProduct.name, productQuantity: 5}}));
    const actionCheckout = checkout({
      cart: [{productName: mockProduct.name, productQuantity: 5}]
    });
    const actionReset = resetCart();
    component.checkout();

    expect(spy).toHaveBeenCalledWith(actionReset);
    expect(spy).toHaveBeenCalledWith(actionCheckout);

  });

});
