import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {ProductsComponent} from './products.component';
import {ProductFileReaderService} from '../../services/product-file-reader.service';
import {ProductToCartService} from '../../services/product-to-cart.service';
import Mock = jest.Mock;
import {mock, when, instance} from 'ts-mockito';
import {of} from 'rxjs';
import {mockProduct, mockProducts} from 'src/app/products.mock';
import {Store, StoreModule} from '@ngrx/store';
import {addProduct, removeProduct} from 'src/app/cart/actions/cart-actions';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import * as fromDashboard from "../reducers/dashboard-reducer";
import * as fromCart from '../../cart/reducer/cart-reducer';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let spy;
  let store;

  const MockProductFileReader = mock(ProductFileReaderService);
  when(MockProductFileReader.getJSONListOfProducts()).thenReturn(of(mockProducts));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsComponent
      ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({products: fromDashboard.reducer, cart: fromCart.reducer})
      ],
      providers: [
        {
          provide: ProductFileReaderService,
          useValue: instance(MockProductFileReader)
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create it', () => {
    expect(component).toBeTruthy();
  });

  it('should define variables', () => {
    component.ngOnInit();
    expect(component.trues).toBeDefined();
  });

  it('should add Product to cart', () => {
    component.addProduct({product: mockProduct, isInCart: false});
    const action = addProduct({product: mockProduct});

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should remove a product from the cart', () => {
    store.dispatch(addProduct({product: mockProduct}));
    component.removeProduct(mockProduct.name);
    const action = removeProduct({productName: mockProduct.name});

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(action);
  });

});
