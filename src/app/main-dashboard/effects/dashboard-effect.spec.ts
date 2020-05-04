import { Observable, empty, from, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { mock, instance, when } from 'ts-mockito';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';

import { ProductEffect } from './dashboard-effect';
import { ProductFileReaderService } from 'src/app/services/product-file-reader.service';
import { mockProduct, mockProducts } from 'src/app/products.mock';
import * as productAction from '../actions/dashboard-actions';
import * as  cartActions from 'src/app/cart/actions/cart-actions';


export class TestActions extends Actions {

  source: Observable<any>;

  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('ProductEffect', () => {
  let effect: ProductEffect;
  const actions$: Observable<Action> = new Observable<Action>();

  let actions: TestActions;
  const MockFileReaderService: ProductFileReaderService = mock(ProductFileReaderService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: ProductFileReaderService,
          useValue: instance(MockFileReaderService)
        },
        {
          provide: Actions,
          useFactory: getActions
        },
        ProductEffect
      ],
    });

    actions = TestBed.get(Actions);
    effect = TestBed.get(ProductEffect);
  });

  describe('Load product', () => {
    it('it should return success load', () => {
      when(MockFileReaderService.getJSONListOfProducts()).thenReturn(of(mockProducts));
      const action = productAction.loadProduct;
      const outcome = productAction.sucessLoad({ payload: mockProducts });

      actions.stream = hot('--a', { a: action });
      const response = cold('-a', { a: mockProducts });
      const expected = cold('--b', { b: outcome });

      MockFileReaderService.getJSONListOfProducts = jest.fn(() => response);
      expect(effect.loadProducts$).toBeObservable(expected);
    });
  });

  describe('checkout', () => {
    it('should aply checkout', () => {
      const action = cartActions.checkout({ cart: [{ productName: mockProduct.name, productQuantity: 1 }] });
      const outcomes = productAction.checkout({ cart: [{ productName: mockProduct.name, productQuantity: 1 }] });

      actions.stream = hot('--a', { a: action });
      const expected = cold('--b', { b: outcomes });

      expect(effect.checkout$).toBeObservable(expected);
    });
  });
});
