import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { empty, Observable, of } from 'rxjs';
import * as cartActions from 'src/app/cart/actions/cart-actions';
import { mockCart, mockProducts } from 'src/app/products.mock';
import { ProductFileReaderService } from 'src/app/services/product-file-reader.service';
import { instance, mock, when } from 'ts-mockito';
import * as productAction from '../actions/dashboard-actions';
import { ProductEffect } from './dashboard-effect';



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
  when(MockFileReaderService.getJSONListOfProducts()).thenReturn(of(mockProducts));

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
      const action = cartActions.checkout(mockCart);
      const outcomes = productAction.checkout(mockCart);

      actions.stream = hot('--a', { a: action });
      const expected = cold('--b', { b: outcomes });

      expect(effect.checkout$).toBeObservable(expected);
    });
  });
});
