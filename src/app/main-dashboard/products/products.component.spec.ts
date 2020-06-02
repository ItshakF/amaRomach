import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { addProduct, removeProduct } from 'src/app/cart/actions/cart-actions';
import { mockProduct, mockProducts } from 'src/app/products.mock';
import { instance, mock, when } from 'ts-mockito';
import * as cartReducer from '../../cart/reducer/cart-reducer';
import { ProductFileReaderService } from '../../services/product-file-reader.service';
import * as dashboardReducer from '../reducers/dashboard-reducer';
import { ProductsComponent } from './products.component';


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
      imports: [HttpClientTestingModule, StoreModule.forRoot({ products: dashboardReducer.reducer, cart: cartReducer.cartReducer })
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
    expect(component.products).toBeDefined();
  });

  it('should add Product to cart', () => {
    component.addProduct({ product: mockProduct, isInCart: false });
    const addProductAction = addProduct({ product: mockProduct });

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(addProductAction);
  });

  it('should remove a product from the cart', () => {
    store.dispatch(addProduct({ product: mockProduct }));
    component.removeProduct(mockProduct.name);
    const removeProductAction = removeProduct({ productName: mockProduct.name });

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(removeProductAction);
  });

});
