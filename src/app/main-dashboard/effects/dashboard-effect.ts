import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import { ProductFileReaderService } from 'src/app/services/product-file-reader.service';
import * as productActions from '../actions/dashboard-actions';
import * as cartActions from 'src/app/cart/actions/cart-actions';


@Injectable()

export class ProductEffect {

  loadProducts$ = createEffect(() => this.action$.pipe(
    ofType(productActions.loadProduct),
    pipe(switchMap(() => {
      return this.fileReaderService.getJSONListOfProducts()
        .pipe(
          map(products => productActions.sucessLoad({ payload: products })),
          catchError(() => of(productActions.failLoad)),
        );
    })
    )));


  checkout$ = createEffect(() => this.action$.pipe(
    ofType(cartActions.checkout),
    map(action => productActions.checkout({ cart: action.cart }))
  ));

  constructor(private action$: Actions,
              private fileReaderService: ProductFileReaderService) {
  }
}
