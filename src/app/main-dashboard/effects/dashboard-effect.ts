import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productActions from '../actions/dashboard-actions';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { ProductFileReaderService } from 'src/app/services/product-file-reader.service';
import { EMPTY, Observable } from 'rxjs';
import { props } from '@ngrx/store';
import * as cartActions from 'src/app/cart/actions/cart-actions';
import { CartProduct } from 'src/app/model/cart-product.model';
import { Product } from 'src/app/model/product.model';


@Injectable()

export class ProductEffect {

  loadProducts$ = createEffect(() => this.action$.pipe(
    ofType(productActions.dashboardAction.loadProduct),
    mergeMap(() => this.fileReaderService.getJSONListOfProducts()
      .pipe(
        map(products => productActions.sucessLoad({payload : products}),
        catchError(() => EMPTY),
      )
    )
  )));


  // checkout$ = createEffect(() = this.action$.pipe(
  //   ofType(cartActions.checkout),
  //   mergeMap((cart: CartProduct[]) => pipe(map(() => productActions.checkout(cart))
  // ))))

  constructor( private action$: Actions,
               private fileReaderService: ProductFileReaderService) {  }
}
