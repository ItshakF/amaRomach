import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Store, StoreModule } from '@ngrx/store';
import { sucessLoad } from '../../main-dashboard/actions/dashboard-actions';
import * as fromDashboard from '../../main-dashboard/reducers/dashboard-reducer';
import { State } from '../../main-dashboard/reducers/dashboard-reducer';
import { mockCart, mockProduct, mockProducts } from '../../products.mock';
import { addProduct, checkout, updateQuantity } from '../actions/cart-actions';
import * as fromCart from '../reducer/cart-reducer';
import { ModalComponent } from './modal.component';


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
          [fromCart.cartKey]: fromCart.cartReducer
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
    component.updatePrice({ productName: mockProduct.name, productQuantity: 5});

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should activate checkout', () => {
    store.dispatch(addProduct({product: mockProduct}));
    store.dispatch(updateQuantity({updateProduct: {productName: mockProduct.name, productQuantity: 5}}));
    const actionCheckout = checkout({
      cart: [{productName: mockProduct.name, productQuantity: 5}]
    });
    const actionReset = checkout(mockCart);
    component.checkout();

    expect(spy).toHaveBeenCalledWith(actionReset);
    expect(spy).toHaveBeenCalledWith(actionCheckout);

  });

});
